import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
// Функція для створення HTML-картки зображення
export function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('gallery-item');

  const link = document.createElement('a');
  link.href = image.largeImageURL;
  link.classList.add('gallery-link');

  const imageElement = document.createElement('img');
  imageElement.src = image.webformatURL;
  imageElement.alt = image.tags;
  imageElement.classList.add('gallery-image');

  link.appendChild(imageElement);
  card.appendChild(link);

  // Додавання інформації про зображення
  const infoBlock = document.createElement('div');
  infoBlock.classList.add('thumb-block');

  const likesBlock = createInfoBlock('Likes', image.likes);
  const viewsBlock = createInfoBlock('Views', image.views);
  const commentsBlock = createInfoBlock('Comments', image.comments);
  const downloadsBlock = createInfoBlock('Downloads', image.downloads);

  infoBlock.appendChild(likesBlock);
  infoBlock.appendChild(viewsBlock);
  infoBlock.appendChild(commentsBlock);
  infoBlock.appendChild(downloadsBlock);

  card.appendChild(infoBlock);

  return card;
}

// Функція для створення інформаційного блоку
function createInfoBlock(label, value) {
  const block = document.createElement('div');
  block.classList.add('block');

  const title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = label;

  const amount = document.createElement('p');
  amount.classList.add('amount');
  amount.textContent = value;

  block.appendChild(title);
  block.appendChild(amount);

  return block;
}

// Функція для оновлення галереї
export function updateGallery(images) {
  const galleryList = document.querySelector('.gallery');
  galleryList.innerHTML = ''; // Очищення галереї

  images.forEach(image => {
    const card = createImageCard(image);
    galleryList.appendChild(card);
  });

  // Оновлення SimpleLightbox після додавання зображень
  if (window.lightbox && typeof window.lightbox.refresh === 'function') {
    window.lightbox.refresh();
  }
}

// Функція для відображення повідомлення про помилку
export function showErrorMessage(message) {
  // Перевірка, що iziToast підключений та не null
  if (!iziToast || iziToast === null) {
    console.error('iziToast is not defined or null');
    return;
  }

  iziToast.error({
    title: 'Error',
    message,
  });
}

// Функція для відображення індикатора завантаження
export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

// Функція для приховування індикатора завантаження
export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}
