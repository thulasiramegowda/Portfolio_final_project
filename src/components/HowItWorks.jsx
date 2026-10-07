import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Input",
      desc: "Upload an image or use your camera."
    },
    {
      num: "02",
      title: "Processing",
      desc: "The image is sent to the detection backend."
    },
    {
      num: "03",
      title: "AI Detection",
      desc: "The trained ML model identifies helmet usage."
    },
    {
      num: "04",
      title: "Result",
      desc: "The frontend displays the prediction and confidence."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-12 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our system uses advanced computer vision to ensure safety compliance in real-time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primaryCyan/50 to-transparent z-0"></div>
              )}
              
              <div className="glass-card p-8 rounded-2xl relative z-10 h-full flex flex-col hover:border-primaryCyan/50 transition-colors">
                <span className="text-5xl font-black text-white/5 mb-6 block">{step.num}</span>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primaryCyan inline-block"></span>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
