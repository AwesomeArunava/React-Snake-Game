import React from 'react';

const GameOver = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="w-80 h-40 bg-[#37474F] rounded-lg shadow-lg flex flex-col items-center justify-center border-amber-50">
        <h1 className="text-white text-2xl font-bold">Game Over</h1>
        <h2 className="text-white text-lg">Press <strong>F5</strong> to Restart</h2>
      </div>
    </div>
  );
};

export default GameOver;
