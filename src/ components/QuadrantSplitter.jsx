import React, { useState, memo } from 'react';

const Quadrant = memo(({ data, onQuadrantClick }) => {

  return (
    <div
      onClick={(e) => onQuadrantClick(e, data.id)}
      style={{
        position: 'absolute',
        left: data.x,
        top: data.y,
        width: data.width,
        height: data.height,
        backgroundColor: data.color,
        cursor: 'pointer',
        transition: 'all 0.5s ease'
      }}
    />
  );
});

const QuadrantSplitter = () => {
  // generate random color
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  // uniqueColor for immediate siblings
  const generateUniqueColors = () => {
    const colors = new Set();
    while (colors.size < 4) {
      colors.add(getRandomColor());
    }
    return Array.from(colors);
  };

  const [quadrants, setQuadrants] = useState({
    nextId: 1,
    items: {
      '0': {
        id: '0',
        color: getRandomColor(),
        x: 0,
        y: 0,
        width: '100vw',
        height: '100vh'
      }
    }
  });

  const handleQuadrantClick = (e, id) => {
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    setQuadrants(prev => {
      const clickedQuadrant = prev.items[id];
      if (!clickedQuadrant) return prev;
      const [topLeftColor, topRightColor, bottomLeftColor, bottomRightColor] = generateUniqueColors()
      const newQuadrants = {
        nextId: prev.nextId + 4,
        items: {
          ...prev.items,
          [prev.nextId]: {
            id: String(prev.nextId),
            color: topLeftColor,
            x: clickedQuadrant.x,
            y: clickedQuadrant.y,
            width: clickX + 'px',
            height: clickY + 'px'
          },
          [prev.nextId + 1]: {
            id: String(prev.nextId + 1),
            color:topRightColor,
            x: clickedQuadrant.x + clickX,
            y: clickedQuadrant.y,
            width: (rect.width - clickX) + 'px',
            height: clickY + 'px'
          },
          [prev.nextId + 2]: {
            id: String(prev.nextId + 2),
            color:bottomLeftColor,
            x: clickedQuadrant.x,
            y: clickedQuadrant.y + clickY,
            width: clickX + 'px',
            height: (rect.height - clickY) + 'px'
          },
          [prev.nextId + 3]: {
            id: String(prev.nextId + 3),
            color: bottomRightColor,
            x: clickedQuadrant.x + clickX,
            y: clickedQuadrant.y + clickY,
            width: (rect.width - clickX) + 'px',
            height: (rect.height - clickY) + 'px'
          }
        }
      };

      // Remove the clicked quadrant
      delete newQuadrants.items[id];
      
      return newQuadrants;
    });
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {Object.values(quadrants.items).map(quadrant => (
        <Quadrant
          key={quadrant.id}
          data={quadrant}
          onQuadrantClick={handleQuadrantClick}
        />
      ))}
    </div>
  );
};

export default QuadrantSplitter;