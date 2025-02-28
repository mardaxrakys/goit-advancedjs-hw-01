const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Об'єкт для зберігання даних форми
let formData = {
  email: '',
  message: '',
};

// Перевіряємо, чи є збережені дані
const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  form.elements.email.value = formData.email || '';
  form.elements.message.value = formData.message || '';
}

// Слухаємо події введення
form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
});

// Слухаємо подію відправки форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка, чи заповнені всі поля
  if (!formData.email || !formData.message) {
    alert('Будь ласка, заповніть всі поля!');
    return;
  }

  console.log('Відправлені дані:', formData);

  // Очищуємо локальне сховище та форму
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
