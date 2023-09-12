import throttle from "lodash.throttle";


// Ключ для сховища
const STORAGE_KEY = 'feedback-form-state';

// Отримуємо форму і її поля
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Функція для зберігання стану форми у локальному сховищі
const saveFormData = () => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Функція для заповнення полів форми зі збереженими даними
const loadFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageTextarea.value = formData.message || '';
  }
};

// Функція для очищення сховища та полів форми
const clearFormData = () => {
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageTextarea.value = '';
};

// Відстеження подій input на полях форми
emailInput.addEventListener('input', throttle(saveFormData, 500));
messageTextarea.addEventListener('input', throttle(saveFormData, 500));

// Відстеження події submit форми
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formData); // Вивести дані у консоль
  clearFormData(); // Очистити сховище та поля форми
});

// Під час завантаження сторінки заповнюємо поля форми зі збереженими даними
loadFormData();


