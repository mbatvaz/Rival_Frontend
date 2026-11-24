import { faDigits } from '../../core/format.js';

export function phoneChallenge(resend, hint, policy) {
  let review;
  let sequence;
  let challenge;
  let timer;
  const stop = () => window.clearInterval(timer);
  const exhausted = () => challenge.attempts >= policy.maxAttempts;

  function refresh() {
    const seconds = Math.max(0, Math.ceil((challenge.resendAt - Date.now()) / 1000));
    const clock = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
    resend.disabled = seconds > 0;
    resend.textContent = seconds ? 'ارسال دوباره کد تا ' + faDigits(clock) : 'ارسال دوباره کد';
  }

  return {
    stop, exhausted,
    reset(forReview, start) {
      review = forReview;
      sequence = start;
    },
    issue(example, seconds = policy.resendSeconds) {
      stop();
      const now = Date.now();
      challenge = {
        value: example ?? policy.demoCodes[sequence++ % policy.demoCodes.length],
        resendAt: now + seconds * 1000,
        expiresAt: now + policy.validSeconds * 1000,
        attempts: 0
      };
      hint.textContent = review ? '' : 'کد آزمایشی: ' + faDigits(challenge.value);
      refresh();
      timer = window.setInterval(refresh, 1000);
    },
    check(value) {
      if (Date.now() >= challenge.expiresAt) return 'زمان این کد تمام شد. کد تازه بگیرید.';
      if (value === challenge.value) return '';
      challenge.attempts++;
      return exhausted() ? 'برای ادامه کد تازه بگیرید.' : 'کد تأیید درست نیست.';
    }
  };
}
