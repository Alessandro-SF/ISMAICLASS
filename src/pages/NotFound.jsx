import { Link } from 'react-router-dom'

export default function NotFound({ what = 'page' }) {
  return (
    <div className="grid place-items-center py-24 text-center">
      <p className="font-display text-7xl font-bold text-blood-500">404</p>
      <h1 className="h-display mt-2 text-2xl text-white">That {what} isn't in the octagon</h1>
      <p className="mt-2 max-w-md text-sm text-zinc-400">It may have been removed from the card, or the link is wrong.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to dashboard
      </Link>
    </div>
  )
}
