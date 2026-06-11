type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ onPageChange, page, totalPages }: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-text-muted">
        Page <span className="font-bold text-text">{page}</span> of <span className="font-bold text-text">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-xl border border-border px-4 py-2 font-semibold transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-xl border border-border px-4 py-2 font-semibold transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
