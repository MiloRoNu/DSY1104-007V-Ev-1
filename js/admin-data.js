/* ============================================================
   admin-data.js
   Capa de datos del administrador.
   Todo se guarda en localStorage, siguiendo la misma práctica
   que ya usa el carrito del sitio. No hay backend.
   ============================================================ */

const LLAVE_PRODUCTOS = 'confun_productos';
const LLAVE_USUARIOS = 'usuarios'; // misma llave que ya usa register.js

const CATEGORIAS = ['Consolas', 'Accesorios', 'Videojuegos', 'Repuestos'];
const TIPOS_USUARIO = ['Administrador', 'Vendedor', 'Cliente'];

// Catálogo inicial: replica los productos que ya muestra la tienda.
const PRODUCTOS_INICIALES = [
  { codigo: 'CONX', nombre: 'Consola X', descripcion: 'Excelente rendimiento para streaming y títulos estándar.', precio: 299990, stock: 12, stockCritico: 3, categoria: 'Consolas', imagen: 'img/consolax.png' },
  { codigo: 'CONY', nombre: 'Consola Y', descripcion: 'Potencia gráfica superior para juegos a 60 FPS estables.', precio: 399990, stock: 8, stockCritico: 3, categoria: 'Consolas', imagen: 'img/consolay.png' },
  { codigo: 'CONZ', nombre: 'Consola Z', descripcion: 'Nuestra consola más potente con Ray Tracing completo.', precio: 499990, stock: 2, stockCritico: 3, categoria: 'Consolas', imagen: 'img/consolaz.png' },
  { codigo: 'CON1', nombre: 'Consola 1', descripcion: 'Modelo portátil y de sobremesa para todo tipo de jugadores.', precio: 299990, stock: 20, stockCritico: 5, categoria: 'Consolas', imagen: 'img/consola1.png' },
  { codigo: 'CON2', nombre: 'Consola 2', descripcion: 'Plataforma versátil para catálogo digital y juego local.', precio: 399990, stock: 6, stockCritico: 4, categoria: 'Consolas', imagen: 'img/consola2.png' },
  { codigo: 'CON3', nombre: 'Consola 3', descripcion: 'La cumbre del procesamiento gráfico.', precio: 499990, stock: 1, stockCritico: 2, categoria: 'Consolas', imagen: 'img/consola3.png' }
];

const USUARIOS_INICIALES = [
  { run: '111111111', nombre: 'Admin', apellidos: 'ConFun', usuario: 'admin', password: 'Abcd1234', correo: 'admin@duoc.cl', fechaNacimiento: '', tipo: 'Administrador', region: 'Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Oficina central ConFun' }
];

/* ---------- Lectura y escritura ---------- */

function leerProductos() {
  const guardado = localStorage.getItem(LLAVE_PRODUCTOS);
  if (!guardado) {
    localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(PRODUCTOS_INICIALES));
    return [...PRODUCTOS_INICIALES];
  }
  try {
    return JSON.parse(guardado);
  } catch (error) {
    return [...PRODUCTOS_INICIALES];
  }
}

function guardarProductos(lista) {
  localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(lista));
}

function leerUsuarios() {
  const guardado = localStorage.getItem(LLAVE_USUARIOS);
  if (!guardado) {
    localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(USUARIOS_INICIALES));
    return [...USUARIOS_INICIALES];
  }
  try {
    return JSON.parse(guardado);
  } catch (error) {
    return [...USUARIOS_INICIALES];
  }
}

function guardarUsuarios(lista) {
  localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(lista));
}

/* ---------- Búsquedas ---------- */

function buscarProducto(codigo) {
  return leerProductos().find((p) => p.codigo === codigo);
}

function buscarUsuario(run) {
  return leerUsuarios().find((u) => u.run === run);
}

/* ---------- Utilidades ---------- */

// Formatea un número como precio chileno.
function formatearPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CL');
}

// Lee un parámetro de la URL (ej: admin-producto-editar.html?codigo=CONX).
function parametroUrl(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}

// Rellena un <select> con un arreglo de textos.
function llenarSelect(idSelect, opciones, textoVacio) {
  const select = document.getElementById(idSelect);
  if (!select) return;
  select.innerHTML = `<option value="">${textoVacio}</option>`;
  opciones.forEach((opcion) => {
    const item = document.createElement('option');
    item.value = opcion;
    item.textContent = opcion;
    select.appendChild(item);
  });
}
