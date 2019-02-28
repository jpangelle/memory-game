import React from 'react';

export default ({ time }) => {
  const formattedTime = Number((time / 1000).toFixed(2));
  const minutes = Math.floor(formattedTime / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (formattedTime - Number(minutes) * 60)
    .toFixed(2)
    .padStart(5, '0');
  return (
    <div className="time">
      {minutes}:{seconds}
    </div>
  );
};
