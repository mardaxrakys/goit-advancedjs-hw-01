// 1. Оголошуємо об'єкт для збереження введених даних
const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 2. Перевіряємо, чи є збережені дані у локальному сховищі
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  const parsedData = JSON.parse(savedData);
  formData.email = parsedData.email || '';
  formData.message = parsedData.message || '';
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// 3. Функція для оновлення локального сховища при зміні введених даних
form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 4. Обробник події відправлення форми
form.addEventListener('submit', event => {
  event.preventDefault(); // Забороняємо перезавантаження сторінки

  // 5. Перевіряємо, чи заповнені всі поля форми
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // 6. Виводимо в консоль об'єкт з актуальними даними
  console.log('Form Data Submitted:', formData);

  // 7. Очищаємо локальне сховище, об'єкт formData і саму форму
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
