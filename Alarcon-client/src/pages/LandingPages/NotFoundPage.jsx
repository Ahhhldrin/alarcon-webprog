import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { SmokeBackground } from '../../components/ui/spooky-smoke-animation'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8 relative overflow-hidden">
      {/* Smoke animation background */}
      <div className="absolute inset-0">
        <SmokeBackground smokeColor="#9333ea" />
      </div>

      {/* Faded 404 background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[300px] font-bold text-white opacity-10">404</span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          We lost this page
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition flex items-center gap-2"
          >
            ← Go back
          </button>

        </div>
      </div>
    </div>
  )
}



export default NotFoundPage

