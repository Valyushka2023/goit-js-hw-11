export async function getPictures(searchTerm) {
  const API_KEY = '43767722-bbce12454ab409ccbfe76519c'; // Ключ API Pixabay
  const BASE_URL = 'https://pixabay.com/api/'; // Базова URL API Pixabay

  // Заміна пробілів на '+'
  if (searchTerm.includes(' ')) {
    searchTerm = searchTerm.replace(/\s+/g, '+');
  }

  // Створення параметрів пошуку
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  // Відправка HTTP-запиту
  const response = await fetch(`${BASE_URL}?${searchParams}`);

  // Перевірка відповіді
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Отримання JSON-даних
  const data = await response.json();

  // Повернення даних
  return data;
}
