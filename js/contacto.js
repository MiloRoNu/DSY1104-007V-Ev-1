document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');
  const status = document.getElementById('form-status');

  if (!form) return;

  const validadores = {
    nombre: (v) => v.trim().length >= 2 || 'Ingresa tu nombre (mínimo 3 caracteres).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Ingresa un correo válido.',
    asunto: (v) => v.trim().length >= 3 || 'Cuéntanos brevemente el asunto.',
    mensaje: (v) => v.trim().length >= 10 || 'Tu mensaje debe tener al menos 10 caracteres.'
  };

  function mostrarError(campo, mensaje) {
    const contenedor = campo.closest('.campo');
    const errorSpan = contenedor.querySelector('.error');
    if (mensaje) {
      contenedor.classList.add('campo-invalido');
      errorSpan.textContent = mensaje;
    } else {
      contenedor.classList.remove('campo-invalido');
      errorSpan.textContent = '';
    }
  }

  function validarCampo(campo) {
    const validador = validadores[campo.name];
    if (!validador) return true;
    const resultado = validador(campo.value);
    if (resultado === true) {
      mostrarError(campo, '');
      return true;
    }
    mostrarError(campo, resultado);
    return false;
  }

  form.querySelectorAll('input, textarea').forEach((campo) => {
    campo.addEventListener('blur', () => validarCampo(campo));
  });

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const campos = Array.from(form.querySelectorAll('input, textarea'));
    const esValido = campos.map(validarCampo).every(Boolean);

    if (!esValido) {
      status.textContent = 'Revisa los campos marcados en rojo.';
      status.className = 'form-status fallo';
      return;
    }

    const boton = form.querySelector('.btn-enviar');
    boton.disabled = true;
    status.textContent = 'Su mensaje a sido enviado correctamente. Gracias por contactarnos.';
    status.className = 'form-status';

    const datos = Object.fromEntries(new FormData(form).entries());
  });
});