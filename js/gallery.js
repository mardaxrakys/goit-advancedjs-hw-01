const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.gallery');

// Генеруємо розмітку галереї
const galleryMarkup = images
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join('');

galleryContainer.innerHTML = galleryMarkup;

// Масив посилань на великі зображення
const imageUrls = images.map((image) => image.original);
let currentIndex = 0;
let instance = null;

// Функція для відкриття модального вікна
const openModal = (imageUrl) => {
  currentIndex = imageUrls.indexOf(imageUrl); // Отримуємо індекс відкритого зображення

  instance = basicLightbox.create(
    `
    <img src="${imageUrl}" width="800" height="600">
  `,
    {
      onShow: () => document.addEventListener('keydown', handleKeyPress),
      onClose: () => document.removeEventListener('keydown', handleKeyPress),
    }
  );

  instance.show();
};

// Функція для обробки клавіш
const handleKeyPress = (event) => {
  if (event.key === 'Escape') {
    instance.close();
  } else if (event.key === 'ArrowRight') {
    showNextImage();
  } else if (event.key === 'ArrowLeft') {
    showPrevImage();
  }
};

// Функція для показу наступного зображення
const showNextImage = () => {
  currentIndex = (currentIndex + 1) % imageUrls.length; // Перехід до наступного (циклічно)
  updateModalImage();
};

// Функція для показу попереднього зображення
const showPrevImage = () => {
  currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length; // Перехід назад (циклічно)
  updateModalImage();
};

// Оновлення зображення у відкритому модальному вікні
const updateModalImage = () => {
  const newImageUrl = imageUrls[currentIndex];
  const modalImage = instance.element().querySelector('img');
  modalImage.src = newImageUrl;
};

// Обробник кліків на галереї (делегування подій)
galleryContainer.addEventListener('click', (event) => {
  event.preventDefault(); // Забороняємо завантаження зображення

  const clickedImage = event.target;
  if (clickedImage.nodeName !== 'IMG') return;

  const largeImageUrl = clickedImage.dataset.source; // Отримуємо посилання на велике зображення
  openModal(largeImageUrl);
});
