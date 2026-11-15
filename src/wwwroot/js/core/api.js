import { basePath, localUrl } from './config.js';

// ARCH / contract §3.3: the sole data boundary. Every write is local and demo-only.
export class ApiError extends Error {
  constructor(code, message, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.demo = true;
  }
}

function validate(resource, state = 'default') {
  if (!/^[a-z0-9_-]+(?:\/[a-z0-9_-]+)*$/i.test(resource) || !/^[a-z0-9_-]+$/i.test(state)) {
    throw new ApiError('INVALID_RESOURCE', 'مسیر داده معتبر نیست.');
  }
}

const key = resource => `rival:demo:v1:${basePath()}:${resource}`;
const clone = value => JSON.parse(JSON.stringify(value));

export async function read(resource, { state = 'default', signal } = {}) {
  validate(resource, state);
  const suffix = state === 'default' ? '' : '.' + state;
  let response;
  try {
    response = await fetch(localUrl(`mock-data/${resource}${suffix}.json`), { signal });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('NETWORK_ERROR', 'اطلاعات در دسترس نیست.');
  }
  if (!response.ok) throw new ApiError('HTTP_ERROR', 'اطلاعات پیدا نشد.', response.status);
  let result;
  try { result = await response.json(); }
  catch { throw new ApiError('INVALID_RESPONSE', 'ساختار داده معتبر نیست.'); }
  if (result?.demo !== true || typeof result.ok !== 'boolean') {
    throw new ApiError('INVALID_RESPONSE', 'ساختار پاسخ معتبر نیست.');
  }
  if (!result.ok) {
    if (!result.error?.code || !result.error?.message) {
      throw new ApiError('INVALID_RESPONSE', 'ساختار خطا معتبر نیست.');
    }
    throw new ApiError(result.error.code, result.error.message, result.error.status);
  }
  if (!Object.hasOwn(result, 'data')) throw new ApiError('INVALID_RESPONSE', 'دادهٔ پاسخ موجود نیست.');
  if (state === 'default') {
    try {
      const saved = JSON.parse(localStorage.getItem(key(resource)));
      if (saved?.demo === true && saved.ok === true) return saved;
    } catch { /* Fixtures remain usable when storage is unavailable or corrupt. */ }
  }
  return result;
}

export async function write(resource, data) {
  validate(resource);
  const result = { ok: true, demo: true, data };
  try {
    const serialized = JSON.stringify(result);
    const detached = JSON.parse(serialized);
    localStorage.setItem(key(resource), serialized);
    return detached;
  } catch {
    throw new ApiError('STORAGE_ERROR', 'ذخیره در این مرورگر ممکن نیست.');
  }
}

export async function reset(resource) {
  validate(resource);
  try { localStorage.removeItem(key(resource)); }
  catch { throw new ApiError('STORAGE_ERROR', 'پاک‌کردن داده ممکن نیست.'); }
  return clone({ ok: true, demo: true, data: null });
}

export const api = { read, write, reset };
