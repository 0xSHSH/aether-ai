import React from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      <Scene />
      <Overlay />
    </div>
  );
};

export default App;