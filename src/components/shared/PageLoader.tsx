import Spinner from "./Spinner"

type PageLoaderProps = {
  message?: string
}

export default function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 text-text">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Spinner />
        </span>
        <div>
          <p className="font-heading text-sm font-black">{message}</p>
          <p className="text-xs text-text-muted">Please wait a moment.</p>
        </div>
      </div>
    </div>
  )
}
