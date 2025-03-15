const HowItWorks = () => {
    const learnerSteps = [
      { icon: "🔍", title: "Search for Tutors", 
        desc: "Filter by subject, location, and availability using our advanced search" },
      { icon: "📊", title: "Compare Profiles", 
        desc: "Review qualifications, ratings, and teaching styles" },
      { icon: "📅", title: "Book Sessions", 
        desc: "Schedule directly through our calendar system" },
      { icon: "🚀", title: "Start Learning", 
        desc: "Join virtual sessions and track your progress" }
    ];
  
    const tutorSteps = [
      { icon: "📝", title: "Create Profile", 
        desc: "Showcase your expertise, availability, and teaching approach" },
      { icon: "🤝", title: "Get Matched", 
        desc: "Receive requests from ideal students" },
      { icon: "💸", title: "Teach & Earn", 
        desc: "Conduct sessions and manage payments securely" }
    ];
  
    return (
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-xl">
              Simple steps to find tutors or start teaching
            </p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Learner Section */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <img src="https://i.pinimg.com/236x/b2/da/f9/b2daf9019c4b08fa3a90c7d28a08a059.jpg" className="border-2 border-gray-200 rounded-md" />
                For Learners
              </h3>
              <div className="space-y-6">
                {learnerSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl h-fit">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:opacity-90 transition-opacity">
                Find Your Tutor Now
              </button>
            </div>
  
            {/* Tutor Section */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
               <img src="https://i.pinimg.com/236x/08/cb/2d/08cb2d6f9ba35b4340b2988786ea1ba6.jpg" className="border-2 border-gray-200 rounded-md h-80 w-80" />
                For Tutors
              </h3>
              <div className="space-y-6">
                {tutorSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl h-fit">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg hover:opacity-90 transition-opacity">
                Start Teaching Today
              </button>
            </div>
          </div>
        </div>
      </section>
    );
};
  
export default HowItWorks;