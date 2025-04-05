import { useState } from "react";

interface Story {
  id: number;
  name: string;
  role: string;
  image: string;
  before: { skill: string; level: string };
  after: { skill: string; level: string };
  hours: number;
  earnings: string;
  badges: string[];
  category: string;
  video?: string;
  quote: string;
}

const StudentSuccessStories = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

   const stories: Story[] = [
    {
      id: 1,
      name: "Emilia Clark",
      role: "UX Designer @ TechCo",
      image: "https://i.pinimg.com/474x/84/38/8a/84388acbada29cc23680a5f67adf59b9.jpg",
      before: { skill: "Figma", level: "Beginner" },
      after: { skill: "Figma", level: "Advanced" },
      hours: 40,
      earnings: "+$28k Salary",
      badges: ["Adobe Certified", "Promotion"],
      category: "design",
      video: "https://youtu.be/2K1D51MLIWw?si=EDAfZzB2XWcePe3B",
      quote: "From basic prototypes to leading design teams!",
    },
    {
      id: 2,
      name: "Mary Anne",
      role: "Full Stack Developer",
      image: "https://i.pinimg.com/736x/6b/16/68/6b1668c016af353e6fd624262aece221.jpg",
      before: { skill: "JavaScript", level: "Novice" },
      after: { skill: "React/Node", level: "Expert" },
      hours: 120,
      earnings: "Freelance to $95k Job",
      badges: ["AWS Certified", "Top Rated"],
      category: "coding",
      video:'https://www.youtube.com/watch?v=25R8li8EokY',
      quote: "Landing page ➔ Complex SaaS platforms!",
    },
    {
      id: 3,
      name: "Peter Gomez",
      role: "Bilingual Account Manager",
      image: "https://i.pinimg.com/474x/10/8d/3b/108d3b91d89ff52b4826e41bb3724f28.jpg",
      before: { skill: "Business English", level: "Intermediate" },
      after: { skill: "Negotiation", level: "Fluent" },
      hours: 60,
      earnings: "3 Promotions in 2 Years",
      badges: ["TOEFL 115", "Leadership"],
      category: "language",
      quote: "Confidence to lead international deals",
    },
  ];


  const filteredStories =
    activeCategory === "all"
      ? stories
      : stories.filter((story) => story.category === activeCategory);

  return (
    <section className="py-16 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Transformative Journeys
          </h2>
          <p className="text-blue-200 text-lg">
            Where dedication meets opportunity
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8 animate-slide-up">
          {["all", "coding", "design", "language"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-blue-300 hover:bg-blue-900"
              }`}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, idx) => (
            <div
              key={story.id}
              className="relative bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 animate-card-entrance"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="absolute top-0 left-0 bg-blue-500 text-white px-4 py-1 rounded-tr-xl text-xs font-bold">
                {story.hours}h Mastery
              </div>

              <div className="flex items-center mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-400 shadow-lg"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">{story.name}</h3>
                  <p className="text-blue-400 text-sm">{story.role}</p>
                </div>
              </div>

              {story.video && (
                <div 
                  className="relative mb-6 cursor-pointer group"
                  onClick={() => setSelectedStory(story)}
                >
                  <img
                    src={getThumbnail(story.video)}
                    alt="Video thumbnail"
                    className="rounded-xl w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl transition-opacity duration-300 group-hover:bg-black/20">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-700/50 p-4 rounded-xl mb-6">
                <div className="flex justify-between mb-3">
                  <span className="text-blue-400 text-sm">Before</span>
                  <span className="text-blue-300 text-sm">After</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold">{story.before.skill}</p>
                    <p className="text-blue-200 text-sm">{story.before.level}</p>
                  </div>
                  <div className="mx-4 text-blue-300">→</div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{story.after.skill}</p>
                    <p className="text-blue-200 text-sm">{story.after.level}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-blue-400 font-semibold text-lg mb-3">
                  {story.earnings}
                </div>
                <div className="flex flex-wrap gap-2">
                  {story.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 bg-blue-900/50 rounded-full text-sm text-blue-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-blue-300 italic relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-500">
                "{story.quote}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ["1.2k+", "Career Advances"],
            ["98%", "Skill Improvement"],
            ["4.8/5", "Satisfaction Rate"],
            ["50k+", "Lessons Completed"]
          ].map(([value, label]) => (
            <div key={label} className="p-4 bg-gray-800 rounded-xl transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-blue-400">{value}</div>
              <div className="text-blue-200">{label}</div>
            </div>
          ))}
        </div>

        {selectedStory?.video && (
          <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center z-50 backdrop-blur-md">
            <div className="relative w-full max-w-4xl p-4 animate-modal-entrance">
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute -top-8 right-0 text-blue-300 hover:text-blue-500 text-3xl transition-colors"
              >
                &times;
              </button>
              <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeId(selectedStory.video)}?autoplay=1`}
                  className="rounded-xl"
                  title="Student success story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentSuccessStories;