// Permisos por rol. 'ver' = listados y detalles, 'editar' = crear/modificar/eliminar.
const PERMISOS = {
  Administrador: { ver: true, editar: true },
  Vendedor: { ver: true, editar: false },
  Cliente: { ver: false, editar: false }
};

function obtenerSesion() {
  return {
    activa: sessionStorage.getItem('usuarioLog') === 'true',
    usuario: sessionStorage.getItem('nombreUsuario') || '',
    rol: sessionStorage.getItem('rolUsuario') || 'Cliente'
  };
}

function puede(accion) {
  const sesion = obtenerSesion();
  const permisos = PERMISOS[sesion.rol] || PERMISOS.Cliente;
  return sesion.activa && permisos[accion] === true;
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = 'inicio-sesion.html';
}

// Bloquea la página si el usuario no tiene permiso de lectura.
// requiereEdicion = true en las vistas de crear y editar.
function protegerVista(requiereEdicion) {
  const sesion = obtenerSesion();

  if (!sesion.activa) {
    alert('Debes iniciar sesión para acceder al administrador.');
    window.location.href = 'inicio-sesion.html';
    return false;
  }

  if (!puede('ver')) {
    alert('Tu perfil no tiene acceso al panel administrativo.');
    window.location.href = 'index.html';
    return false;
  }

  if (requiereEdicion && !puede('editar')) {
    alert('Tu perfil solo puede consultar información, no modificarla.');
    window.location.href = 'admin-panel.html';
    return false;
  }

  return true;
}

// Pinta el nombre del usuario, su rol y esconde las acciones que no puede usar.
function aplicarSesionEnVista() {
  const sesion = obtenerSesion();

  const etiquetaUsuario = document.getElementById('admin-usuario-activo');
  if (etiquetaUsuario) {
    etiquetaUsuario.textContent = `${sesion.usuario} (${sesion.rol})`;
  }

  if (!puede('editar')) {
    document.querySelectorAll('[data-requiere-edicion]').forEach((elemento) => {
      elemento.style.display = 'none';
    });
  }

  const botonSalir = document.getElementById('btn-cerrar-sesion');
  if (botonSalir) {
    botonSalir.addEventListener('click', cerrarSesion);
  }
}
