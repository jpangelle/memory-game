import React from 'react';
import Tile from './Tile';

export default ({ boardData, flipCount, handleFlip }) => (
  <div className="board">
    {boardData.map(tile => (
      <Tile
        key={tile.uniqueId}
        handleFlip={handleFlip}
        flipCount={flipCount}
        tileData={tile}
      />
    ))}
  </div>
);
