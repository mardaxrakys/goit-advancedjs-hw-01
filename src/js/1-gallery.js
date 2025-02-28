import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Масив зображень (може бути отриманий з API)
const images = [
  {
    preview: 'img/small1.jpg',
    original: 'img/large1.jpg',
    description: 'Image 1',
  },
  {
    preview: 'img/small2.jpg',
    original: 'img/large2.jpg',
    description: 'Image 2',
  },
  {
    preview: 'img/small3.jpg',
    original: 'img/large3.jpg',
    description: 'Image 3',
  },
];

// Отримуємо контейнер галереї
const galleryContainer = document.querySelector('.gallery');

// Створюємо розмітку галереї
const galleryMarkup = images
  .map(
    ({ preview, original, description }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img class="gallery-image" src="${preview}" alt="${description}" />
      </a>
    </li>
  `
  )
  .join('');

galleryContainer.innerHTML = galleryMarkup;

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log('Галерея успішно ініціалізована!');
