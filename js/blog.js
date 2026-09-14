document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.caso-foto').forEach((foto) => {
    foto.addEventListener('error', () => {
      foto.classList.add('caso-foto--rota');
    });
  });

  document.querySelectorAll('.btn-ver-caso').forEach((boton) => {
    boton.addEventListener('click', () => {
      const expandido = boton.getAttribute('aria-expanded') === 'true';
      boton.setAttribute('aria-expanded', String(!expandido));

      const detalleId = boton.getAttribute('aria-controls');
      const detalle = document.getElementById(detalleId);
      if (detalle) {
        detalle.classList.toggle('oculto');
      }
    });
  });
});