import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;
  const pages = getPageList(page, totalPages);

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
      <button className="btn btn-ghost btn-icon" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <FiChevronLeft />
      </button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="text-muted" style={{ padding: '0 4px' }}>…</span>
        ) : (
          <button key={p} onClick={() => onPageChange(p)} aria-current={p === page ? 'page' : undefined} className="btn btn-sm"
            style={{ background: p === page ? 'var(--color-primary)' : 'transparent', color: p === page ? 'var(--color-accent)' : 'var(--color-text)', minWidth: 36 }}>
            {p}
          </button>
        )
      )}
      <button className="btn btn-ghost btn-icon" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
        <FiChevronRight />
      </button>
    </nav>
  );
}

function getPageList(current, total) {
  const delta = 1;
  const range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) range.push(i);
  if (range[0] > 1) {
    if (range[0] > 2) range.unshift('…');
    range.unshift(1);
  }
  if (range[range.length - 1] < total) {
    if (range[range.length - 1] < total - 1) range.push('…');
    range.push(total);
  }
  return range;
}