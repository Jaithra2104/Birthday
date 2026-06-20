import photosData from './photos.json';

// Helper to shuffle array
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

// Group photos by their folder name based on the URL path
const allGroupedPhotos = photosData.reduce((acc, photo) => {
  const parts = photo.url.split('/');
  if (parts.length > 2) {
    const folder = parts[2];
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(photo.url);
  }
  return acc;
}, {});

// Limit photos but allow more for her photos to create more bubbles
export const groupedPhotos = {};
for (const folder in allGroupedPhotos) {
  const limit = folder === 'her photos' ? 25 : 7;
  groupedPhotos[folder] = shuffle([...allGroupedPhotos[folder]]).slice(0, limit);
}

// Helper function to safely get photos for a specific category
export const getPhotosByCategory = (categoryName) => {
  return groupedPhotos[categoryName] || [];
};
