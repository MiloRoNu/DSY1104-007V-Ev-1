document.addEventListener('DOMContentLoaded', () => {
  const mapeoIds = {
    "Consola X": "consolax",
    "Consola Y": "consolay",
    "Consola Z": "consolaz",
    "Consola A": "consolaa",
    "Consola B": "consolab",
    "Consola C": "consolac",
    "Consola 1": "consola1",
    "Consola 2": "consola2",
    "Consola 3": "consola3"
  };

  const tarjetas = document.querySelectorAll('.product-card');
  tarjetas.forEach(tarjeta => {
    const titulo = tarjeta.querySelector('h2');
    if (!titulo) return;

    const nombre = titulo.textContent.trim();
    const idProd = mapeoIds[nombre] || nombre.toLowerCase().replace(/\s+/g, '');
    const enlaceDetalle = `detalle-producto.html?id=${idProd}`;

    // Enlazar el botón "Ver" existente sin tocar productos.html
    const botonVer = tarjeta.querySelector('.view-button');
    if (botonVer) {
      botonVer.setAttribute('href', enlaceDetalle);
    }

    // Permitir clic directo en la imagen
    const imagen = tarjeta.querySelector('.product-image');
    if (imagen) {
      imagen.style.cursor = 'pointer';
      imagen.addEventListener('click', () => {
        window.location.href = enlaceDetalle;
      });
    }
  });
});