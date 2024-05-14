import { getPictures } from './js/pixabay-api.js';
import { updateGallery, showErrorMessage, showLoader, hideLoader } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Ініціалізація SimpleLightbox на верхньому рівні
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlay: true,
  close: true,
  className: 'custom-lightbox',
});

// Змінні
const searchForm = document.querySelector('.js-search');
const gallery = document.querySelector('.gallery');

// Обробник події пошуку
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Очищення галереї
  gallery.innerHTML = '';

  // Отримання значення пошуку
  const searchTerm = event.target.elements.search.value.trim();

  // Якщо пошуковий запит порожній, завершити роботу
  if (!searchTerm) return;

  // Показати індикатор завантаження
  showLoader();

  getPictures(searchTerm)
    .then(images => {
      // Приховати індикатор завантаження
      hideLoader();

      // Перевірка наявності зображень
      if (!images.hits.length) {
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!n');
        return;
      }

      // Оновлення галереї
      updateGallery(images.hits);

      // Оновлення SimpleLightbox
      lightbox.refresh();
    })
    .catch(error => {
      // Приховати індикатор завантаження та показати повідомлення про помилку
      hideLoader();
      showErrorMessage('Щось пішло не так. Будь ласка, спробуйте ще раз.');
      console.error(error);
    });
});