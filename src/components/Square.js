import React from 'react';

const Square = React.memo(({ value, onClick, isWinning }) => {
  return (
    <div className={`square ${isWinning ? 'winning' : ''}`} onClick={onClick}>
      {value}
    </div>
  );
});

export default Square;
