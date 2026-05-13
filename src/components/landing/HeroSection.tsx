import { Button } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-rm-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-rm-primary-light text-rm-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-rm-primary rounded-full" />
            Free room planner &mdash; no sign up required
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-rm-dark leading-[1.1] mb-6">
            Design Your Perfect{' '}
            <span className="text-rm-primary">Room Layout</span>
          </h1>

          <p className="text-base sm:text-lg text-rm-muted max-w-xl mx-auto mb-10 leading-relaxed">
            Plan your room with an intuitive shape-based editor. Place furniture, customize dimensions, and visualize your space &mdash; all for free, right in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onPress={() => navigate('/editor')}
              className="bg-rm-primary text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-rm-primary-dark transition-all shadow-lg shadow-rm-primary/25 cursor-pointer data-[pressed]:scale-[0.97] outline-none w-full sm:w-auto"
            >
              Start Designing Now
            </Button>
            <a
              href="#how-it-works"
              className="text-rm-muted hover:text-rm-text px-6 py-3.5 rounded-xl text-base font-medium transition-colors w-full sm:w-auto text-center border border-gray-200 bg-white"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-14 flex items-center justify-center gap-12">
            {[
              { value: '100%', label: 'Free to use' },
              { value: '14+', label: 'Furniture types' },
              { value: 'In & Cm', label: 'Unit options' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-rm-dark">{stat.value}</div>
                <div className="text-sm text-rm-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-100 p-3">
            <div className="bg-rm-surface-alt rounded-xl aspect-[16/10] relative overflow-hidden">
              <div className="absolute inset-6 sm:inset-10 border-2 border-dashed border-gray-300 rounded-lg" />
              <div className="absolute top-[20%] left-[12%] w-[18%] h-[25%] bg-blue-100 border-2 border-blue-400 rounded-md flex items-center justify-center text-xs font-semibold text-blue-600">
                Bed
              </div>
              <div className="absolute top-[18%] right-[15%] w-[16%] h-[14%] bg-yellow-100 border-2 border-yellow-500 rounded-md flex items-center justify-center text-xs font-semibold text-yellow-600">
                Sofa
              </div>
              <div className="absolute bottom-[20%] left-[18%] w-[12%] h-[16%] bg-green-100 border-2 border-green-500 rounded-md flex items-center justify-center text-xs font-semibold text-green-600">
                Table
              </div>
              <div className="absolute bottom-[22%] right-[20%] w-[10%] h-[12%] bg-purple-100 border-2 border-purple-400 rounded-md flex items-center justify-center text-[10px] font-semibold text-purple-600">
                Shelf
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rm-muted/40 text-sm">
                Drag shapes to design your room
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gray-300/30 blur-md rounded-full" />
        </div>
      </div>
    </section>
  );
}
