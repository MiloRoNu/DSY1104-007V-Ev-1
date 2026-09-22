// Usamos 'cart' en todo el documento
let cart = JSON.parse(localStorage.getItem('miCarrito')) || [];

function addToCart(product, price) {
  const nuevoProducto = {
    nombre: product,
    precio: price
  };

  // Se añade a 'cart'
  cart.push(nuevoProducto);

  // Se guarda 'cart' (no carrito)
  localStorage.setItem('miCarrito', JSON.stringify(cart));

  updateCart();
  alert(product + " agregado al carrito");
}

function updateCart() {
  const contador = document.getElementById('carrito-cantidad');
  if (contador) {
    // Se lee la longitud de 'cart'
    contador.innerText = cart.length;
  }
}

function vaciarCarrito() {
  // Se vacía 'cart'
  let texto = "¿Estás seguro que quieres vaciar el carrito?";
  if (confirm(texto) == true) {
    cart = [];
    localStorage.removeItem('miCarrito');
    updateCart();
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  const contenedor = document.getElementById('carrito-items');
  const total = document.getElementById('total');

  if (!contenedor) return;

  contenedor.innerHTML = '';

  if (cart.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    total.innerText = '0';
    return;
  }

  let totalNum = 0;

  cart.forEach((producto, index) => {
    totalNum += producto.precio;

    const div = document.createElement('div');
    const precioFormateado = producto.precio.toLocaleString('es-CL');

    div.innerHTML = `
    <div class="card-prod">
      <h3 class="nom-prod">${producto.nombre}</h3>
      <p class="pre-prod">$${precioFormateado}</p>
      <button class="buy-button" onclick="eliminarItem(${index})">Eliminar</button>
    </div>
    `;

    contenedor.appendChild(div);
  });

  total.innerText = totalNum.toLocaleString('es-CL');
}

function eliminarItem(index) {
  let texto = "¿Estás seguro que quieres eliminar el producto?";
  if (confirm(texto) == true) {
    cart.splice(index, 1);

    localStorage.setItem('miCarrito', JSON.stringify(cart));

    updateCart();
    mostrarCarrito();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCart();
  mostrarCarrito();
});
