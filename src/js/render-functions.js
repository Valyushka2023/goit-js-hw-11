import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

// Функція для створення HTML-картки зображення
export function createImageCard(image) {
  return `
    <div class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
      </a>
      <div class="thumb-block">
        ${createInfoBlock('Likes', image.likes)}
        ${createInfoBlock('Views', image.views)}
        ${createInfoBlock('Comments', image.comments)}
        ${createInfoBlock('Downloads', image.downloads)}
      </div>
    </div>
  `;
}

// Функція для створення інформаційного блоку
function createInfoBlock(label, value) {
  return `
    <div class="block">
      <h2 class="title">${label}</h2>
      <p class="amount">${value}</p>
    </div>
  `;
}

// Функція для оновлення галереї
export function updateGallery(images) {
  const galleryList = document.querySelector('.gallery');
  galleryList.innerHTML = '';// Очищення галереї

  const cardsHTML = images.map(image => createImageCard(image)).join('');
  galleryList.insertAdjacentHTML('beforeend', cardsHTML);
}

// Функція для відображення повідомлення про помилку
export function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}

// Функція для відображення індикатора завантаження
export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'block';
  }
}

// Функція для приховування індикатора завантаження
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}