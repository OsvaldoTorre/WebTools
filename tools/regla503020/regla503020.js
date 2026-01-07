document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputSueldo = document.getElementById('inputSueldo');
  const inputExtra = document.getElementById('inputExtra');
  const inputPago = document.getElementById('inputPago');
  
  const displayTotal = document.getElementById('displayTotal');
  const displayNecesidades = document.getElementById('displayNecesidades');
  const displayDeseos = document.getElementById('displayDeseos');
  const displayAhorro = document.getElementById('displayAhorro');

  // Función para formatear números como moneda (MXN)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  };

  // Validar entrada de teclado para evitar caracteres no numéricos (e, -, +)
  const preventInvalidChars = (e) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };
  inputSueldo.addEventListener('keydown', preventInvalidChars);
  inputExtra.addEventListener('keydown', preventInvalidChars);

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Obtener valores, si están vacíos usar 0
    const sueldo = parseFloat(inputSueldo.value) || 0;
    const extra = parseFloat(inputExtra.value) || 0;
    
    if (sueldo < 0 || extra < 0) {
      alert('Por favor, ingresa valores positivos.');
      return;
    }

    let total = sueldo + extra;

    // Ajustar total a mensual según selección
    if (inputPago.value === "Semana") {
      total *= 4;
    } else if (inputPago.value === "Quincena") {
      total *= 2;
    }

    const necesidades = total * 0.50;
    const deseos = total * 0.30;
    const ahorro = total * 0.20;

    // Actualizar el DOM
    displayTotal.textContent = formatCurrency(total);
    displayNecesidades.textContent = formatCurrency(necesidades);
    displayDeseos.textContent = formatCurrency(deseos);
    displayAhorro.textContent = formatCurrency(ahorro);
  });

  form.addEventListener('reset', () => {
    displayTotal.textContent = '$0.00';
    displayNecesidades.textContent = '$0.00';
    displayDeseos.textContent = '$0.00';
    displayAhorro.textContent = '$0.00';
  });
});
