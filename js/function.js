
const phoneInput = document.getElementById('phoneInput');

phoneInput.value = '+7';

phoneInput.addEventListener('input', function (e) {
  let value = e.target.value;

  if (!value.startsWith('+7')) {
    value = '+7';
  }

  let digits = value.replace(/\D/g, '').substring(1);

  let formattedValue = '+7';
  if (digits.length > 0) {
    formattedValue += ' (' + digits.substring(0, 3);
  }
  if (digits.length > 3) {
    formattedValue += ') ' + digits.substring(3, 6);
  }
  if (digits.length > 6) {
    formattedValue += '-' + digits.substring(6, 8);
  }
  if (digits.length > 8) {
    formattedValue += '-' + digits.substring(8, 10);
  }

  e.target.value = formattedValue;
});

phoneInput.addEventListener('keydown', function (e) {
  if (e.target.selectionStart < 2 && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
    e.preventDefault();
  }
});