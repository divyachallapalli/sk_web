import { useRef, useState, useEffect } from 'react';
import Card from './Card';

export default function Carousel({ items}) {
  const scrollRefs = useRef({});
  const [hasOverflow, setHasOverflow] = useState({});

  useEffect(() => {
    const checkOverflow = () => {
      const newOverflow = {};
      items.forEach((item) => {
        const scrollElement = scrollRefs.current[item.id];
        if (scrollElement) {
          newOverflow[item.id] = scrollElement.scrollWidth > scrollElement.clientWidth;
        }
      });
      setHasOverflow(newOverflow);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [items]);

  const scroll = (itemId, direction) => {
    const scrollElement = scrollRefs.current[itemId];
    if (!scrollElement) return;

    const scrollAmount = 220; // Card width
    const newScrollLeft = scrollElement.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    scrollElement.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      {items.map((item) => 
      <div key={item.id} className="carousel-section">
          <div className="carousel-section-title">{item.title}</div>
          <div 
            className="carousel-scroll"
            ref={(el) => {scrollRefs.current[item.id] = el}}
          >
            {item?.images?.map((img) => {
               return (
                <Card key={img.id}  item={img} />
              );
            })}
          </div>
          {hasOverflow[item.id] && (
            <div className="carousel-controls">
              <button 
                className="carousel-control-btn carousel-control-left"
                onClick={() => scroll(item.id, 'left')}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <button 
                className="carousel-control-btn carousel-control-right"
                onClick={() => scroll(item.id, 'right')}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}