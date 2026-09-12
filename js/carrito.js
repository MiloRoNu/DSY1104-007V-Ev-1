document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const productName = productCard.querySelector('h2').textContent;
      const productPrice = productCard.querySelector('.price').textContent;
      const product = { name: productName, price: productPrice };
      addToCart(product);
    });
  });
});

var cart = [];

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  const itemsCarritoContenedor = document.getElementById('carrito-items');
  itemsCarritoContenedor.innerHTML = '';


  if (cart.length === 0) {
    const mensajeVacio = document.createElement('p');
    mensajeVacio.textContent = 'El carrito está vacío.';
    itemsCarritoContenedor.appendChild(mensajeVacio);
  }
}

const carritoCantidad = document.getElementById('carrito-cantidad');
function updateCartQuantity() {
  carritoCantidad.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantity();
});

