const formulario = document.getElementById('form-register');
const mensaje = document.getElementById('message');

const REGLAS_REGISTRO = {
  run: (v) => {
    if (!esRequerido(v)) return 'El RUN es obligatorio.';
    if (/[.\-]/.test(v)) return 'Escribe el RUN sin puntos ni guion.';
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
  password: (v) => {
    if (!esRequerido(v)) return 'La contraseña es obligatoria.';
    if (!largoEntre(v, 4, 10)) return 'La contraseña debe tener entre 4 y 10 caracteres.';
    return true;
  },
  password2: (v) => {
    if (!esRequerido(v)) return 'Debes confirmar la contraseña.';
    if (v !== formulario.password.value) return 'Las contraseñas no coinciden.';
    return true;
  },
  fechaNacimiento: () => true,
  telefono: (v) => {
    if (!esRequerido(v)) return true;
    if (!/^\+?\d{8,15}$/.test(String(v).trim())) return 'Ingresa solo números (8 a 15 dígitos).';
    return true;
  },
  region: (v) => (esRequerido(v) ? true : 'Debes seleccionar una región.'),
  comuna: (v) => (esRequerido(v) ? true : 'Debes seleccionar una comuna.'),
  direccion: (v) => {
    if (!esRequerido(v)) return 'La dirección es obligatoria.';
    if (!noSuperaLargo(v, 300)) return 'La dirección no puede superar los 300 caracteres.';
    return true;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  cargarRegionesComunas('region', 'comuna');
  activarValidacionEnVivo(formulario, REGLAS_REGISTRO);
});

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  if (!validarFormulario(formulario, REGLAS_REGISTRO)) {
    mensaje.style.color = 'red';
    mensaje.innerText = 'Revisa los campos marcados en rojo.';
    return;
  }

  const usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || [];
  const run = formulario.run.value.trim().toUpperCase();
  const correo = formulario.correo.value.trim().toLowerCase();

  if (usuariosDB.some((u) => u.run === run)) {
    mensaje.style.color = 'red';
    mensaje.innerText = 'Ya existe una cuenta registrada con ese RUN.';
    return;
  }

  if (usuariosDB.some((u) => String(u.correo || '').toLowerCase() === correo)) {
    mensaje.style.color = 'red';
    mensaje.innerText = 'Ya existe una cuenta con ese correo.';
    return;
  }

  usuariosDB.push({
    run: run,
    nombre: formulario.nombre.value.trim(),
    apellidos: formulario.apellidos.value.trim(),
    correo: correo,
    usuario: correo,
    password: formulario.password.value,
    fechaNacimiento: formulario.fechaNacimiento.value,
    telefono: formulario.telefono.value.trim(),
    tipo: 'Cliente', // el registro público siempre crea clientes
    region: formulario.region.value,
    comuna: formulario.comuna.value,
    direccion: formulario.direccion.value.trim()
  });

  localStorage.setItem('usuarios', JSON.stringify(usuariosDB));

  mensaje.style.color = 'green';
  mensaje.innerText = '¡Cuenta creada con éxito! Te llevamos al inicio de sesión.';

  setTimeout(() => { window.location.href = 'inicio-sesion.html'; }, 1500);
});
