const SocialProof = () => {
  const testimonials = [
    {
      quote: "From complete beginner to job-ready developer in 6 months! The personalized tutoring made all the difference.",
      name: "Tabe Rickson",
      role: "Frontend Developer @TechCorp",
      score: "4.98/5",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      details: "Tabe started with no coding experience and now works at a top tech company. He credits his success to the hands-on tutoring and real-world projects."
    },
    {
      quote: "My math grades improved from C to A+ in just 3 months of weekly sessions. Best investment in my education!",
      name: "Michael Obi",
      role: "High School Student",
      score: "4.95/5",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      details: "Michael struggled with math for years but turned things around with personalized tutoring. He now tutors his peers in advanced calculus."
    }
  ];

  const achievements = [
    { number: "25K+", label: "Active Students" },
    { number: "10K+", label: "Hours Taught" },
    { number: "4.5/5", label: "Average Rating" },
    { number: "98%", label: "Success Rate" }
  ];

  const sponsors = [
    { 
      name: 'Tech Chantier',
      logo: 'src/assets/techchantier.png'
    },
    { 
      name: 'AfroVision',
      logo: 'src/assets/afroVision.png'
    },
    { 
      name: 'Nkwa',
      logo: 'src/assets/Nkwa.png' 
    },
    { 
      name: 'Buyum',
      logo: 'src/assets/buyum.png' 
    }
  ];

  // Double array for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Achievement Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {item.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Main Content */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Rating:</span>
                <span className="text-yellow-400">★★★★★</span>
                <span className="ml-2">{testimonial.score}</span>
              </div>

              {/* Expanded Details on Hover */}
              <div className="absolute inset-0 bg-white p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.details}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">Rating:</span>
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2">{testimonial.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Trusted By Section with Auto Scroll */}
        <div className="mt-16">
          <h3 className="text-gray-500 mb-8 text-center text-lg font-medium">
            Trusted by Leading Organizations Worldwide
          </h3>
          <div className="relative overflow-hidden py-8">
            <div className="animate-infinite-scroll flex w-max items-center space-x-16">
              {duplicatedSponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="group flex flex-col items-center justify-center min-w-[200px] transform transition-all duration-500 hover:scale-105 px-6 py-4 rounded-xl hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-center justify-center h-32 w-48">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="object-contain max-h-20 w-full transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-gray-700 font-medium text-lg mt-4 opacity-90 group-hover:opacity-100 transition-opacity">
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add global styles for animation */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SocialProof;