
const REGLAS_USUARIO = {
  run: (v) => {
    if (!esRequerido(v)) return 'El RUN es obligatorio.';
    if (/[.\-]/.test(v)) return 'Escribe el RUN sin puntos ni guion (ej: 123456785).';
    if (!largoEntre(v, 7, 9)) return 'El RUN debe tener entre 7 y 9 caracteres.';
    if (!esRunValido(v)) return 'El RUN no es válido (dígito verificador incorrecto).';
    return true;
  },
  nombre: (v) => {
    if (!esRequerido(v)) return 'El nombre es obligatorio.';
    if (!noSuperaLargo(v, 50)) return 'El nombre no puede superar los 50 caracteres.';
    return true;
  },
  apellidos: (v) => {
    if (!esRequerido(v)) return 'Los apellidos son obligatorios.';
    if (!noSuperaLargo(v, 100)) return 'Los apellidos no pueden superar los 100 caracteres.';
    return true;
  },
  correo: (v) => {
    if (!esRequerido(v)) return 'El correo es obligatorio.';
    if (!noSuperaLargo(v, 100)) return 'El correo no puede superar los 100 caracteres.';
    if (!esCorreoPermitido(v)) return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    return true;
  },
  fechaNacimiento: () => true, // opcional
  tipo: (v) => (esRequerido(v) ? true : 'Debes seleccionar el tipo de usuario.'),
  region: (v) => (esRequerido(v) ? true : 'Debes seleccionar una región.'),
  comuna: (v) => (esRequerido(v) ? true : 'Debes seleccionar una comuna.'),
  direccion: (v) => {
    if (!esRequerido(v)) return 'La dirección es obligatoria.';
    if (!noSuperaLargo(v, 300)) return 'La dirección no puede superar los 300 caracteres.';
    return true;
  }
};

/* ---------- Vista: listado ---------- */
function iniciarListadoUsuarios() {
  const cuerpoTabla = document.getElementById('tabla-usuarios');
  if (!cuerpoTabla) return;

  const usuarios = leerUsuarios();

  if (usuarios.length === 0) {
    cuerpoTabla.innerHTML = '<tr><td colspan="6">No hay usuarios registrados.</td></tr>';
    return;
  }

  cuerpoTabla.innerHTML = usuarios.map((u) => `
    <tr>
      <td>${u.run || '—'}</td>
      <td>${[u.nombre, u.apellidos].filter(Boolean).join(' ') || u.usuario || '—'}</td>
      <td>${u.correo || '—'}</td>
      <td>${u.tipo || 'Cliente'}</td>
      <td>${u.comuna || '—'}</td>
      <td class="acciones">
        <a class="btn-tabla" href="admin-usuario-mostrar.html?run=${u.run}">Ver</a>
        <a class="btn-tabla" href="admin-usuario-editar.html?run=${u.run}" data-requiere-edicion>Editar</a>
        <button class="btn-tabla btn-borrar" data-requiere-edicion onclick="eliminarUsuario('${u.run}')">Eliminar</button>
      </td>
    </tr>`).join('');

  aplicarSesionEnVista();
}

function eliminarUsuario(run) {
  if (!puede('editar')) return;
  if (!confirm(`¿Eliminar al usuario con RUN ${run}?`)) return;

  const restantes = leerUsuarios().filter((u) => u.run !== run);
  guardarUsuarios(restantes);
  iniciarListadoUsuarios();
}

/* ---------- Vista: mostrar detalle ---------- */
function iniciarMostrarUsuario() {
  const contenedor = document.getElementById('detalle-admin-usuario');
  if (!contenedor) return;

  const usuario = buscarUsuario(parametroUrl('run'));

  if (!usuario) {
    contenedor.innerHTML = '<p>No se encontró el usuario solicitado.</p>';
    return;
  }

  contenedor.innerHTML = `
    <dl class="ficha">
      <dt>RUN</dt><dd>${usuario.run || '—'}</dd>
      <dt>Nombre</dt><dd>${usuario.nombre || '—'}</dd>
      <dt>Apellidos</dt><dd>${usuario.apellidos || '—'}</dd>
      <dt>Correo</dt><dd>${usuario.correo || '—'}</dd>
      <dt>Fecha de nacimiento</dt><dd>${usuario.fechaNacimiento || 'No informada'}</dd>
      <dt>Tipo de usuario</dt><dd>${usuario.tipo || 'Cliente'}</dd>
      <dt>Región</dt><dd>${usuario.region || '—'}</dd>
      <dt>Comuna</dt><dd>${usuario.comuna || '—'}</dd>
      <dt>Dirección</dt><dd>${usuario.direccion || '—'}</dd>
    </dl>
    <a class="buy-button" href="admin-usuario-editar.html?run=${usuario.run}" data-requiere-edicion>Editar este usuario</a>
  `;

  aplicarSesionEnVista();
}

/* ---------- Vistas: crear y editar ---------- */
function iniciarFormularioUsuario(modo) {
  const form = document.getElementById('form-usuario');
  if (!form) return;

  const mensaje = document.getElementById('form-mensaje');
  llenarSelect('tipo', TIPOS_USUARIO, '-- Seleccione el tipo --');
  cargarRegionesComunas('region', 'comuna');

  let runOriginal = null;

  if (modo === 'editar') {
    runOriginal = parametroUrl('run');
    const usuario = buscarUsuario(runOriginal);

    if (!usuario) {
      form.innerHTML = '<p>No se encontró el usuario que intentas editar.</p>';
      return;
    }

    form.run.value = usuario.run || '';
    form.run.readOnly = true; // el RUN identifica al usuario
    form.nombre.value = usuario.nombre || '';
    form.apellidos.value = usuario.apellidos || '';
    form.correo.value = usuario.correo || '';
    form.fechaNacimiento.value = usuario.fechaNacimiento || '';
    form.tipo.value = usuario.tipo || '';
    form.direccion.value = usuario.direccion || '';

    // La comuna depende de la región: primero se fija la región y se dispara el cambio.
    form.region.value = usuario.region || '';
    form.region.dispatchEvent(new Event('change'));
    form.comuna.value = usuario.comuna || '';
  }

  activarValidacionEnVivo(form, REGLAS_USUARIO);

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!validarFormulario(form, REGLAS_USUARIO)) {
      mensaje.textContent = 'Revisa los campos marcados en rojo.';
      mensaje.className = 'form-mensaje fallo';
      return;
    }

    const usuarios = leerUsuarios();
    const run = form.run.value.trim().toUpperCase();

    const datos = {
      run: run,
      nombre: form.nombre.value.trim(),
      apellidos: form.apellidos.value.trim(),
      correo: form.correo.value.trim(),
      fechaNacimiento: form.fechaNacimiento.value,
      tipo: form.tipo.value,
      region: form.region.value,
      comuna: form.comuna.value,
      direccion: form.direccion.value.trim()
    };

    if (modo === 'nuevo') {
      if (usuarios.some((u) => u.run === run)) {
        mensaje.textContent = 'Ya existe un usuario con ese RUN.';
        mensaje.className = 'form-mensaje fallo';
        return;
      }
      // Credenciales por defecto para que pueda iniciar sesión desde la tienda.
      datos.usuario = datos.correo;
      datos.password = 'Abcd1234';
      usuarios.push(datos);
    } else {
      const indice = usuarios.findIndex((u) => u.run === runOriginal);
      if (indice === -1) return;
      // Se conservan las credenciales existentes.
      datos.usuario = usuarios[indice].usuario || datos.correo;
      datos.password = usuarios[indice].password || 'Abcd1234';
      usuarios[indice] = datos;
    }

    guardarUsuarios(usuarios);

    mensaje.textContent = modo === 'nuevo'
      ? 'Usuario creado correctamente. Contraseña inicial: Abcd1234'
      : 'Cambios guardados correctamente.';
    mensaje.className = 'form-mensaje exito';

    setTimeout(() => { window.location.href = 'admin-usuarios.html'; }, 1500);
  });
}
