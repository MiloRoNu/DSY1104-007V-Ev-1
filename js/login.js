const fomrulario = document.getElementById('form-login');
const usuario = document.getElementById('user');
const contrasena = document.getElementById('pass');
const mensaje = document.getElementById('message');

let usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || [];

fomrulario.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const user = usuario.value;
  const pass = contrasena.value;

  const usuarioValido = usuariosDB.find(
    user1 => user1.usuario === user && user1.password === pass
  );

  if (user === 'admin' && pass === 'Abcd1234') {
    mensaje.style.color = 'green';
    mensaje.innerText = '¡Inicio de sesión exitoso!';

    sessionStorage.setItem('usuarioLog', true);
    sessionStorage.setItem('nombreUsuario', user);

    setTimeout(() => {
      window.location.href = 'admin-panel.html';
    }, 1000);
  }
  else if (usuarioValido){
    mensaje.style.color = 'green';
    mensaje.innerText = '¡Bienvenido, ' + usuarioValido.usuario + '!';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
  else {
    mensaje.style.color = 'red';
    mensaje.innerText = 'Usuario o contraseña incorrectos.';

    contrasena.value = '';
    contrasena.focus();
  }
});