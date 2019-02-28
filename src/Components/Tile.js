import React from 'react';
import '../styles/Tile.css';

export default ({ handleFlip, flipCount, tileData }) => {
  const { alt, image, flipped, matched, uniqueId } = tileData;
  return (
    <div className="tile" onClick={() => handleFlip(uniqueId)}>
      <img
        className={`${flipped || matched ? 'flipped' : 'unflipped'} ${matched &&
          'matched'} ${flipCount > 1 && !matched && 'no-match'}`}
        alt={alt}
        src={image}
        height="80"
      />
    </div>
  );
};
