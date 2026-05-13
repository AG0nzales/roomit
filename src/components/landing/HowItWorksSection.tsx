import { Button } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';

export default function HowItWorksSection() {
  const navigate = useNavigate();
  const steps = [
    {
      step: '1',
      title: 'Choose Your Room',
      description: 'Select a room preset or define your own custom dimensions and shape.',
    },
    {
      step: '2',
      title: 'Add Furniture',
      description: 'Drag furniture shapes from the palette onto your room layout.',
    },
    {
      step: '3',
      title: 'Customize & Arrange',
      description: 'Resize pieces, adjust dimensions, and arrange everything to your liking.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-rm-surface-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-rm-dark mb-4">
            Design in 3 simple steps
          </h2>
          <p className="text-rm-muted text-lg">
            From blank room to complete layout in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {steps.map((item, idx) => (
            <div key={item.step} className="relative text-center">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300" />
              )}
              <div className="relative z-10 w-16 h-16 bg-rm-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-rm-primary/20">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-rm-dark mb-2">{item.title}</h3>
              <p className="text-rm-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button
            onPress={() => navigate('/editor')}
            className="bg-rm-primary text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-rm-primary-dark transition-all shadow-lg shadow-rm-primary/25 cursor-pointer data-[pressed]:scale-[0.97] outline-none"
          >
            Try It Now — It&apos;s Free
          </Button>
        </div>
      </div>
    </section>
  );
}
