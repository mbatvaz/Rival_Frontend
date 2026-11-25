const photoTypes = ['image/jpeg', 'image/png', 'image/webp'];

export function showPhoto(image, photo) {
  image.hidden = !photo;
  if (photo === 'sample') image.src = image.dataset.profileSample;
  else if (photo?.startsWith('data:image/jpeg;base64,')) image.src = photo;
  else image.removeAttribute('src');
}

const cropTemplate = `<cropper-canvas background>
  <cropper-image initial-center-size="cover" translatable scalable></cropper-image>
  <cropper-handle action="move" plain></cropper-handle>
  <cropper-selection initial-coverage="1" aspect-ratio="1" outlined></cropper-selection>
</cropper-canvas>`;

export function profilePhoto(form) {
  const get = key => form.querySelector('[data-profile-' + key + ']');
  const preview = get('photo');
  const error = get('form-error');
  const pick = get('pick-photo');
  const remove = get('remove-photo');
  const editor = get('crop');
  const surface = get('crop-surface');
  const apply = get('crop-apply');
  const submit = get('submit');
  const input = form.elements.photo;
  let draft, url, image, cropper;
  let revision = 0;

  function setDraft(photo) {
    draft = photo;
    showPhoto(preview, photo);
    remove.disabled = !photo;
  }

  function end({ focus = false } = {}) {
    revision++;
    editor.hidden = true;
    surface.replaceChildren();
    if (url) window.URL.revokeObjectURL(url);
    url = image = cropper = null;
    pick.disabled = submit.disabled = false;
    remove.disabled = !draft;
    if (focus) pick.focus({ preventScroll: true });
  }

  async function start(file) {
    end();
    const current = revision;
    pick.disabled = remove.disabled = submit.disabled = true;
    apply.disabled = true;
    error.textContent = '';
    try {
      if (!photoTypes.includes(file.type) || file.size > 8 * 1024 * 1024) {
        throw new Error('یک عکس JPG، PNG یا WebP تا ۸ مگابایت انتخاب کنید.');
      }
      url = window.URL.createObjectURL(file);
      const source = new window.Image();
      source.src = url;
      const [{ default: Cropper }] = await Promise.all([import('../../../vendor/cropper.js'), source.decode()]);
      if (current !== revision) return;
      editor.hidden = false;
      cropper = new Cropper(source, { container: surface, template: cropTemplate });
      image = cropper.getCropperImage();
      await image.$ready();
      if (current !== revision) return;
      apply.disabled = false;
      get('crop-zoom-in').focus({ preventScroll: true });
      editor.scrollIntoView({ block: 'nearest' });
    } catch (failure) {
      if (current !== revision) return;
      end({ focus: true });
      error.textContent = failure instanceof TypeError || failure.name === 'EncodingError' ? 'این عکس باز نشد.' : failure.message;
    }
  }

  pick.addEventListener('click', () => input.click());
  remove.addEventListener('click', () => { error.textContent = ''; setDraft(null); });
  input.addEventListener('change', () => {
    const [file] = input.files;
    input.value = '';
    if (file) start(file);
  });
  get('crop-zoom-in').addEventListener('click', () => image?.$zoom(0.1));
  get('crop-zoom-out').addEventListener('click', () => image?.$zoom(-0.1));
  surface.addEventListener('keydown', event => {
    const direction = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[event.key];
    if (direction && image) { event.preventDefault(); image.$move(...direction); }
  });
  get('crop-cancel').addEventListener('click', () => end({ focus: true }));
  apply.addEventListener('click', async () => {
    if (!cropper || apply.disabled) return;
    const current = revision;
    apply.disabled = true;
    try {
      const canvas = await cropper.getCropperSelection().$toCanvas({
        width: 240, height: 240,
        beforeDraw(context) { context.fillStyle = '#fff'; context.fillRect(0, 0, 240, 240); }
      });
      if (current !== revision) return;
      setDraft(canvas.toDataURL('image/jpeg', 0.85));
      end({ focus: true });
    } catch {
      if (current !== revision) return;
      error.textContent = 'برش عکس انجام نشد. دوباره تلاش کنید.';
      apply.disabled = false;
    }
  });
  return { end, setDraft, value: () => draft };
}
