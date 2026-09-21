/* ============================================================
   validaciones.js
   Módulo compartido de validaciones para ConFun.
   Centraliza las reglas de negocio pedidas en el enunciado
   para que login, registro, contacto y el administrador
   usen exactamente los mismos criterios.
   ============================================================ */

// Dominios de correo permitidos por el cliente.
const DOMINIOS_PERMITIDOS = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

/* ---------- Validadores de valor ---------- */

// Devuelve true si el texto no está vacío (ignora espacios).
function esRequerido(valor) {
  return String(valor).trim().length > 0;
}

// Devuelve true si el texto no supera el largo máximo.
function noSuperaLargo(valor, maximo) {
  return String(valor).trim().length <= maximo;
}

// Devuelve true si el texto está dentro de un rango de largo.
function largoEntre(valor, minimo, maximo) {
  const largo = String(valor).trim().length;
  return largo >= minimo && largo <= maximo;
}

// Devuelve true si el correo tiene forma válida y usa un dominio permitido.
function esCorreoPermitido(valor) {
  const correo = String(valor).trim().toLowerCase();
  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!formatoValido) return false;
  return DOMINIOS_PERMITIDOS.some((dominio) => correo.endsWith(dominio));
}

/* ---------- Validación de RUN chileno ---------- */

// Calcula el dígito verificador de un RUN usando el algoritmo módulo 11.
function calcularDigitoVerificador(numero) {
  let suma = 0;
  let multiplicador = 2;

  for (let i = String(numero).length - 1; i >= 0; i--) {
    suma += Number(String(numero)[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return String(resto);
}

// Valida un RUN sin puntos ni guion (ej: 19011022K), entre 7 y 9 caracteres.
function esRunValido(valor) {
  const run = String(valor).trim().toUpperCase().replace(/[.\-]/g, '');

  if (!/^\d{6,8}[0-9K]$/.test(run)) return false;
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const digitoIngresado = run.slice(-1);

  return calcularDigitoVerificador(cuerpo) === digitoIngresado;
}

/* ---------- Validadores numéricos (mantenedor de productos) ---------- */

// Devuelve true si es un número mayor o igual a cero (acepta decimales).
function esPrecioValido(valor) {
  const numero = Number(valor);
  return !isNaN(numero) && valor !== '' && numero >= 0;
}

// Devuelve true si es un entero mayor o igual a cero.
function esEnteroNoNegativo(valor) {
  const numero = Number(valor);
  return !isNaN(numero) && valor !== '' && Number.isInteger(numero) && numero >= 0;
}

/* ---------- Utilidades de interfaz ---------- */

// Pinta u oculta el mensaje de error asociado a un campo.
// Espera la estructura: <div class="campo"><input><span class="error"></span></div>
function mostrarError(campo, mensaje) {
  const contenedor = campo.closest('.campo');
  if (!contenedor) return;

  const errorSpan = contenedor.querySelector('.error');
  if (mensaje) {
    contenedor.classList.add('campo-invalido');
    if (errorSpan) errorSpan.textContent = mensaje;
  } else {
    contenedor.classList.remove('campo-invalido');
    if (errorSpan) errorSpan.textContent = '';
  }
}

// Aplica un objeto de reglas a un formulario y devuelve true si todo pasa.
// Cada regla recibe el valor y devuelve true o el texto del error.
function validarFormulario(form, reglas) {
  const campos = Array.from(form.querySelectorAll('input, textarea, select'));
  let todoValido = true;

  campos.forEach((campo) => {
    const regla = reglas[campo.name];
    if (!regla) return;

    const resultado = regla(campo.value);
    if (resultado === true) {
      mostrarError(campo, '');
    } else {
      mostrarError(campo, resultado);
      todoValido = false;
    }
  });

  return todoValido;
}

// Valida en tiempo real: revisa cada campo al salir de él y mientras se escribe.
function activarValidacionEnVivo(form, reglas) {
  form.querySelectorAll('input, textarea, select').forEach((campo) => {
    const revisar = () => {
      const regla = reglas[campo.name];
      if (!regla) return;
      const resultado = regla(campo.value);
      mostrarError(campo, resultado === true ? '' : resultado);
    };

    campo.addEventListener('blur', revisar);
    campo.addEventListener('input', revisar);
    campo.addEventListener('change', revisar);
  });
}
