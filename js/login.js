const formulario = document.getElementById('form-login');
const campoCorreo = document.getElementById('correo');
const campoPass = document.getElementById('pass');
const mensaje = document.getElementById('message');

const REGLAS_LOGIN = {
  correo: (v) => {
    if (!esRequerido(v)) return 'El correo es obligatorio.';
    if (!noSuperaLargo(v, 100)) return 'El correo no puede superar los 100 caracteres.';
    if (!esCorreoPermitido(v)) return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    return true;
  },
  pass: (v) => {
    if (!esRequerido(v)) return 'La contraseña es obligatoria.';
    if (!largoEntre(v, 4, 10)) return 'La contraseña debe tener entre 4 y 10 caracteres.';
    return true;
  }
};

// Validación en tiempo real mientras el usuario escribe.
activarValidacionEnVivo(formulario, REGLAS_LOGIN);

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  if (!validarFormulario(formulario, REGLAS_LOGIN)) {
    mensaje.style.color = 'red';
    mensaje.innerText = 'Revisa los campos marcados en rojo.';
    return;
  }

  const correo = campoCorreo.value.trim().toLowerCase();
  const pass = campoPass.value;

  const usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Se acepta tanto el correo como el campo 'usuario' guardado por el registro.
  const usuarioValido = usuariosDB.find(
    (u) => (String(u.correo || '').toLowerCase() === correo || String(u.usuario || '').toLowerCase() === correo)
      && u.password === pass
  );

  // Cuenta de administrador por defecto para revisar el panel.
  if (correo === 'admin@duoc.cl' && pass === 'Abcd1234') {
    iniciarSesion('Administrador', 'Administrador', 'admin-panel.html');
    return;
  }

  if (usuarioValido) {
    const rol = usuarioValido.tipo || 'Cliente';
    const nombre = usuarioValido.nombre || usuarioValido.usuario || correo;
    const destino = (rol === 'Administrador' || rol === 'Vendedor') ? 'admin-panel.html' : 'index.html';
    iniciarSesion(nombre, rol, destino);
    return;
  }

  mensaje.style.color = 'red';
  mensaje.innerText = 'Correo o contraseña incorrectos.';
  campoPass.value = '';
  campoPass.focus();
});

function iniciarSesion(nombre, rol, destino) {
  sessionStorage.setItem('usuarioLog', 'true');
  sessionStorage.setItem('nombreUsuario', nombre);
  sessionStorage.setItem('rolUsuario', rol);

  mensaje.style.color = 'green';
  mensaje.innerText = '¡Bienvenido, ' + nombre + '!';

  setTimeout(() => { window.location.href = destino; }, 1000);
}
