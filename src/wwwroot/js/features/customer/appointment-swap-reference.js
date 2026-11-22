export function initReferenceSwap(current, openSheet) {
  for (const button of current.querySelectorAll('[data-rv-swap-open]')) {
    const sheet = document.getElementById('rv-swap-' + button.dataset.rvSwapOpen);
    const form = sheet.querySelector('[data-rv-swap-form]');
    const note = document.createElement('p');
    note.className = 'rv-feedback';
    note.textContent = 'این تاریخ نمونهٔ طراحی است. برای ساخت یا ثبت کد آزمایشی، نوبت مشتری یک یا دو را در فهرست پیش‌نمایش باز کنید.';
    const link = document.createElement('a');
    const url = new URL(location.pathname, location.origin);
    url.searchParams.set('swapCustomer', button.dataset.rvSwapOpen === 'create' ? 'a' : 'b');
    url.searchParams.set('swapPreview', button.dataset.rvSwapOpen);
    link.href = url.href;
    link.className = 'rv-btn';
    link.textContent = 'باز کردن نوبت آزمایشی';
    sheet.querySelector('header').after(note);
    note.after(link);
    form.hidden = true;
    button.disabled = false;
    button.removeAttribute('aria-describedby');
    button.addEventListener('click', () => openSheet(sheet.id, button));
  }
}
