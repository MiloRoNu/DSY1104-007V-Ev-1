let usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || []

const formulario = document.getElementById('form-register');
const nuevoUsuario = document.getElementById('new-user');
const nuevaContrasena = document.getElementById('new-pass');
const mensaje = document.getElementById('message');

formulario.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const newUser = nuevoUsuario.value.trim();
  const newPass = nuevaContrasena.value.trim();
  
  const usuarioExiste = usuariosDB.some(user => user.usuario === newUser);

  if (usuarioExiste) {
    mensaje.style.color = 'red';
    mensaje.innerText = 'Ese usuario ya existe. Escoge otro.';
    return;
  }

  const nuevoU = {
    usuario: newUser,
    password: newPass
  };

  usuariosDB.push(nuevoU);
  localStorage.setItem('usuarios', JSON.stringify(usuariosDB));

  mensaje.style.color = 'green';
  mensaje.innerText = '¡Cuenta creada con éxito!';

  setTimeout(() => {
    window.location.href = 'inicio-sesion.html'
  }, 1500);
  

});