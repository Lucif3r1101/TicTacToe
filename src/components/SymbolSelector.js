import React from 'react';

const SymbolSelector = ({ onSelect }) => {
  return (
    <div className="symbol-selector">
      <h2>Choose Your Symbol</h2>
      <button onClick={() => onSelect('X')}>Play as X</button>
      <button onClick={() => onSelect('O')}>Play as O</button>
    </div>
  );
};

export default SymbolSelector;
