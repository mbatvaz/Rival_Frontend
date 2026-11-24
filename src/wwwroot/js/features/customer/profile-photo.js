const photoTypes = ['image/jpeg', 'image/png', 'image/webp'];

export async function thumbnail(file) {
  if (!photoTypes.includes(file.type) || file.size > 8 * 1024 * 1024) {
    throw new Error('یک عکس JPG، PNG یا WebP تا ۸ مگابایت انتخاب کنید.');
  }
  let image;
  try { image = await window.createImageBitmap(file); }
  catch { throw new Error('این عکس باز نشد.'); }
  try {
    const scale = Math.min(1, 240 / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.85);
  } finally { image.close(); }
}

export function showPhoto(image, photo) {
  image.hidden = !photo;
  if (photo === 'sample') image.src = image.dataset.profileSample;
  else if (photo?.startsWith('data:image/jpeg;base64,')) image.src = photo;
  else image.removeAttribute('src');
}
