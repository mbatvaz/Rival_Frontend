import { createHash } from 'node:crypto';
import { URLSearchParams } from 'node:url';

export function variantReview(pageId, revision, query) {
  const params = new URLSearchParams(query.replace(/^\?/, ''));
  params.sort();
  const identity = params.toString();
  const key = createHash('sha256').update(identity).digest('hex').slice(0, 16);
  return { id: pageId + '~' + key,
    revision: createHash('sha256').update(revision + '\n' + identity).digest('hex') };
}

export function prepareReviewEntries(model, revisions) {
  const feed = [];
  let variantCount = 0;
  for (const group of model.groups) for (const entry of group.pages) {
    entry.reviewRevision = revisions.get(entry.id);
    entry.reviewImplemented = Boolean(entry.template);
    feed.push({ id: entry.id, revision: entry.reviewRevision, implemented: entry.reviewImplemented });
    const seen = new Set();
    for (const variant of entry.variants) {
      const review = variantReview(entry.id, entry.reviewRevision, variant.query);
      review.revision = revisions.get(review.id) ?? review.revision;
      if (seen.has(review.id)) throw new Error('Duplicate review state URL: ' + entry.id + variant.query);
      seen.add(review.id);
      variant.reviewId = review.id;
      variant.reviewRevision = review.revision;
      feed.push({ ...review, implemented: entry.reviewImplemented });
      variantCount++;
    }
  }
  model.variantCount = variantCount;
  model.reviewControls = [
    { action: 'mobile', icon: 'smartphone', label: 'تأیید موبایل', shortLabel: 'موبایل' },
    { action: 'desktop', icon: 'grid', label: 'تأیید دسکتاپ', shortLabel: 'دسکتاپ' },
    { action: 'final', icon: 'check-circle', label: 'تأیید نهایی', shortLabel: 'نهایی' }
  ];
  return feed;
}
