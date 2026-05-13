import { Button } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 bg-rm-primary rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="16" height="16" rx="2" stroke="white" strokeWidth="2" />
                <rect x="4" y="4" width="5" height="5" rx="1" fill="white" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold text-rm-dark">roomit</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-rm-muted hover:text-rm-text transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-rm-muted hover:text-rm-text transition-colors">How It Works</a>
          </div>

          <Button
            onPress={() => navigate('/editor')}
            className="bg-rm-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-rm-primary-dark transition-colors cursor-pointer data-[pressed]:scale-[0.97] outline-none"
          >
            Start Designing
          </Button>
        </div>
      </div>
    </nav>
  );
}
