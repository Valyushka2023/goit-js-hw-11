import { getPictures } from './js/pixabay-api.js';
import { updateGallery, showErrorMessage, showLoader, hideLoader } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Змінні
const searchForm = document.querySelector('.js-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox; // Змінна для зберігання екземпляра SimpleLightbox

// Обробник події пошуку
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Очищення галереї
  gallery.innerHTML = '';

  // Отримання значення пошуку
  const searchTerm = event.target.elements.search.value.trim();

  // Якщо пошуковий запит порожній, завершити роботу
  if (!searchTerm) return;

  // Відображення індикатора завантаження
  showLoader();

  // Отримання зображень
  getPictures(searchTerm)
    .then(images => {
      // Приховування індикатора завантаження
      hideLoader();

      // Перевірка наявності зображень
      if (!images.hits.length) {
        showErrorMessage('Зображень не знайдено. Спробуйте інший пошуковий запит.');
        return;
      }

      // Оновлення галереї
      updateGallery(images.hits);

      // Ініціалізація SimpleLightbox 
      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
          // Налаштування лайтбокса
          caption: {
            position: 'bottom',
            className: 'lightbox-caption',
          },
          overlay: {
            className: 'lightbox-overlay',
          },
          close: {
            className: 'lightbox-close',
          },
          className: 'custom-lightbox',
        });
      }

      // Оновлення SimpleLightbox
      lightbox.refresh();
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
});
