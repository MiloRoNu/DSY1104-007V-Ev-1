
const REGLAS_PRODUCTO = {
  codigo: (v) => {
    if (!esRequerido(v)) return 'El código del producto es obligatorio.';
    if (String(v).trim().length < 3) return 'El código debe tener al menos 3 caracteres.';
    return true;
  },
  nombre: (v) => {
    if (!esRequerido(v)) return 'El nombre es obligatorio.';
    if (!noSuperaLargo(v, 100)) return 'El nombre no puede superar los 100 caracteres.';
    return true;
  },
  descripcion: (v) => {
    if (!noSuperaLargo(v, 500)) return 'La descripción no puede superar los 500 caracteres.';
    return true; // opcional
  },
  precio: (v) => {
    if (!esRequerido(v)) return 'El precio es obligatorio.';
    if (!esPrecioValido(v)) return 'El precio debe ser un número mayor o igual a 0.';
    return true;
  },
  stock: (v) => {
    if (!esRequerido(v)) return 'El stock es obligatorio.';
    if (!esEnteroNoNegativo(v)) return 'El stock debe ser un número entero mayor o igual a 0.';
    return true;
  },
  stockCritico: (v) => {
    if (!esRequerido(v)) return true; // opcional
    if (!esEnteroNoNegativo(v)) return 'El stock crítico debe ser un entero mayor o igual a 0.';
    return true;
  },
  categoria: (v) => (esRequerido(v) ? true : 'Debes seleccionar una categoría.'),
  imagen: () => true // opcional
};

/* ---------- Vista: listado ---------- */
function iniciarListadoProductos() {
  const cuerpoTabla = document.getElementById('tabla-productos');
  if (!cuerpoTabla) return;

  const productos = leerProductos();

  if (productos.length === 0) {
    cuerpoTabla.innerHTML = '<tr><td colspan="7">No hay productos registrados.</td></tr>';
    return;
  }

  cuerpoTabla.innerHTML = productos.map((p) => {
    const critico = p.stockCritico !== '' && Number(p.stock) <= Number(p.stockCritico);
    const alerta = critico ? '<span class="chip-alerta">Stock crítico</span>' : '';
    return `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>${formatearPrecio(p.precio)}</td>
        <td>${p.stock} ${alerta}</td>
        <td class="acciones">
          <a class="btn-tabla" href="admin-producto-mostrar.html?codigo=${p.codigo}">Ver</a>
          <a class="btn-tabla" href="admin-producto-editar.html?codigo=${p.codigo}" data-requiere-edicion>Editar</a>
          <button class="btn-tabla btn-borrar" data-requiere-edicion onclick="eliminarProducto('${p.codigo}')">Eliminar</button>
        </td>
      </tr>`;
  }).join('');

  aplicarSesionEnVista();
}

function eliminarProducto(codigo) {
  if (!puede('editar')) return;
  if (!confirm(`¿Eliminar el producto ${codigo}? Esta acción no se puede deshacer.`)) return;

  const restantes = leerProductos().filter((p) => p.codigo !== codigo);
  guardarProductos(restantes);
  iniciarListadoProductos();
}

/* ---------- Vista: mostrar detalle ---------- */
function iniciarMostrarProducto() {
  const contenedor = document.getElementById('detalle-admin-producto');
  if (!contenedor) return;

  const producto = buscarProducto(parametroUrl('codigo'));

  if (!producto) {
    contenedor.innerHTML = '<p>No se encontró el producto solicitado.</p>';
    return;
  }

  const critico = producto.stockCritico !== '' && Number(producto.stock) <= Number(producto.stockCritico);

  contenedor.innerHTML = `
    ${critico ? '<p class="aviso-critico">Atención: este producto alcanzó su stock crítico.</p>' : ''}
    <dl class="ficha">
      <dt>Código</dt><dd>${producto.codigo}</dd>
      <dt>Nombre</dt><dd>${producto.nombre}</dd>
      <dt>Descripción</dt><dd>${producto.descripcion || 'Sin descripción'}</dd>
      <dt>Precio</dt><dd>${formatearPrecio(producto.precio)}</dd>
      <dt>Stock</dt><dd>${producto.stock}</dd>
      <dt>Stock crítico</dt><dd>${producto.stockCritico === '' ? 'No definido' : producto.stockCritico}</dd>
      <dt>Categoría</dt><dd>${producto.categoria}</dd>
      <dt>Imagen</dt><dd>${producto.imagen || 'Sin imagen'}</dd>
    </dl>
    <a class="buy-button" href="admin-producto-editar.html?codigo=${producto.codigo}" data-requiere-edicion>Editar este producto</a>
  `;

  aplicarSesionEnVista();
}

/* ---------- Vistas: crear y editar ---------- */
function iniciarFormularioProducto(modo) {
  const form = document.getElementById('form-producto');
  if (!form) return;

  const mensaje = document.getElementById('form-mensaje');
  llenarSelect('categoria', CATEGORIAS, '-- Seleccione la categoría --');

  let codigoOriginal = null;

  if (modo === 'editar') {
    codigoOriginal = parametroUrl('codigo');
    const producto = buscarProducto(codigoOriginal);

    if (!producto) {
      form.innerHTML = '<p>No se encontró el producto que intentas editar.</p>';
      return;
    }

    form.codigo.value = producto.codigo;
    form.codigo.readOnly = true; // el código identifica al producto, no se cambia
    form.nombre.value = producto.nombre;
    form.descripcion.value = producto.descripcion || '';
    form.precio.value = producto.precio;
    form.stock.value = producto.stock;
    form.stockCritico.value = producto.stockCritico ?? '';
    form.categoria.value = producto.categoria;
    form.imagen.value = producto.imagen || '';
  }

  activarValidacionEnVivo(form, REGLAS_PRODUCTO);

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!validarFormulario(form, REGLAS_PRODUCTO)) {
      mensaje.textContent = 'Revisa los campos marcados en rojo.';
      mensaje.className = 'form-mensaje fallo';
      return;
    }

    const productos = leerProductos();
    const datos = {
      codigo: form.codigo.value.trim().toUpperCase(),
      nombre: form.nombre.value.trim(),
      descripcion: form.descripcion.value.trim(),
      precio: Number(form.precio.value),
      stock: Number(form.stock.value),
      stockCritico: form.stockCritico.value === '' ? '' : Number(form.stockCritico.value),
      categoria: form.categoria.value,
      imagen: form.imagen.value.trim()
    };

    if (modo === 'nuevo') {
      if (productos.some((p) => p.codigo === datos.codigo)) {
        mensaje.textContent = 'Ya existe un producto con ese código.';
        mensaje.className = 'form-mensaje fallo';
        return;
      }
      productos.push(datos);
    } else {
      const indice = productos.findIndex((p) => p.codigo === codigoOriginal);
      if (indice === -1) return;
      productos[indice] = datos;
    }

    guardarProductos(productos);

    mensaje.textContent = modo === 'nuevo'
      ? 'Producto creado correctamente.'
      : 'Cambios guardados correctamente.';
    mensaje.className = 'form-mensaje exito';

    setTimeout(() => { window.location.href = 'admin-productos.html'; }, 1200);
  });
}
