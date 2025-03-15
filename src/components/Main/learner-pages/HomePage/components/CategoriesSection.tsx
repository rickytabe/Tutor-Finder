import { useEffect, useState, useRef, useCallback } from "react";
import { CategoryCard } from "./CategoryCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type CategoriesSectionProps = {
  handleSearch: (query: string) => void;
};

export const CategoriesSection = ({ handleSearch }: CategoriesSectionProps) => {
  const [categoryData, setCategoryData] = useState<
    { id: string; name: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = localStorage.getItem("categories");
        if (data) {
          setCategoryData(JSON.parse(data));
        }
      } catch (error) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const cards = container.children;
    if (index < 0 || index >= cards.length) return;

    const card = cards[index] as HTMLElement;
    const scrollPosition = card.offsetLeft - container.offsetLeft;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    
    setCurrentIndex(index);
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    if (!containerRef.current || loading) return;

    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.75
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetIndex = Array.from(containerRef.current!.children)
            .findIndex(child => child === entry.target);
          if (targetIndex !== -1) {
            setCurrentIndex(targetIndex);
          }
        }
      });
    }, options);

    Array.from(containerRef.current.children).forEach(child => {
      observerRef.current?.observe(child);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading]);

  // Scroll end detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScrollEnd = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const cardIndex = Math.round(scrollLeft / containerWidth);
      setCurrentIndex(cardIndex);
    };

    // Modern browsers support
    container.addEventListener('scrollend', handleScrollEnd);
    
    // Fallback for older browsers
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScrollEnd, 100);
    };

    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scrollend', handleScrollEnd);
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : categoryData.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < categoryData.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) handleNext();
    if (touchEnd - touchStart > 50) handlePrev();
  };

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Explore Categories</h2>
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container bg-white px-2 py-10 relative group">
      <h2 className="text-2xl font-bold mb-8">Explore Tutor Categories</h2>

      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute hidden md:block left-0 top-1/2 -translate-y-1/2 z-10 p-3 border-1 border-gray-400 bg-white rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <FaChevronLeft className="w-6 h-6 text-gray-400" />
        </button>

        <button
          onClick={handleNext}
          className="absolute hidden md:block right-0 top-1/2 -translate-y-1/2 z-10 p-3 border-1 border-gray-100 bg-white rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <FaChevronRight className="w-6 h-6 text-gray-400" />
        </button>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth gap-10 p-2 md:overflow-x-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {categoryData.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-full min-w-[85%] md:min-w-0 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 snap-start"
              >
                <CategoryCard
                  category={category}
                  onClick={() => handleSearch(`category:"${category.name}"`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {categoryData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};