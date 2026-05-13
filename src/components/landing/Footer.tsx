export default function Footer() {
  return (
    <footer className="bg-rm-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-rm-primary rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="16"
                  height="16"
                  rx="2"
                  stroke="white"
                  strokeWidth="2"
                />
                <rect x="4" y="4" width="5" height="5" rx="1" fill="white" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
              </svg>
            </div>
            <span className="text-lg font-bold">roomit</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How It Works
            </a>
            <span>Make Your Room po</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Josh Gnzls.
          </div>
        </div>
      </div>
    </footer>
  );
}
