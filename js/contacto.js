/* ============================================================
  contacto.js
  Formulario de contacto.
  Reglas del enunciado:
  - Nombre: requerido, máx 100
  - Correo: máx 100, solo @duoc.cl / @profesor.duoc.cl / @gmail.com
  - Comentario: requerido, máx 500
  El envío se simula: el sitio no tiene backend.
  Requiere: validaciones.js
  ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');
  const estado = document.getElementById('form-status');
  if (!form) return;

  const REGLAS_CONTACTO = {
    nombre: (v) => {
      if (!esRequerido(v)) return 'El nombre es obligatorio.';
      if (!noSuperaLargo(v, 100)) return 'El nombre no puede superar los 100 caracteres.';
      return true;
    },
    email: (v) => {
      if (!esRequerido(v)) return 'El correo es obligatorio.';
      if (!noSuperaLargo(v, 100)) return 'El correo no puede superar los 100 caracteres.';
      if (!esCorreoPermitido(v)) return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
      return true;
    },
    asunto: (v) => {
      if (!esRequerido(v)) return 'Cuéntanos brevemente el asunto.';
      if (!noSuperaLargo(v, 100)) return 'El asunto no puede superar los 100 caracteres.';
      return true;
    },
    mensaje: (v) => {
      if (!esRequerido(v)) return 'El comentario es obligatorio.';
      if (!noSuperaLargo(v, 500)) return 'El comentario no puede superar los 500 caracteres.';
      return true;
    }
  };

  // Validación en tiempo real.
  activarValidacionEnVivo(form, REGLAS_CONTACTO);

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!validarFormulario(form, REGLAS_CONTACTO)) {
      estado.textContent = 'Revisa los campos marcados en rojo.';
      estado.className = 'form-status fallo';
      return;
    }

    const boton = form.querySelector('.btn-enviar');
    boton.disabled = true;
    estado.textContent = 'Enviando...';
    estado.className = 'form-status';

    // Envío simulado: no hay servidor detrás.
    // Los datos quedan disponibles aquí por si más adelante se conecta un backend.
    const datos = Object.fromEntries(new FormData(form).entries());
    console.log('Mensaje de contacto (simulado):', datos);

    setTimeout(() => {
      estado.textContent = 'Tu mensaje fue enviado correctamente. Gracias por contactarnos.';
      estado.className = 'form-status exito';
      form.reset();
      boton.disabled = false;
    }, 600);
  });
});
