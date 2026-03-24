import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// The Thin Briefcase Concept: Sleek sliding doors, zero 3D glitches.
const ThinBriefcase = ({ isOpen, status }) => {
  return (
    <div className="relative w-full max-w-sm h-64 bg-black rounded-xl border border-neutral-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden my-8 flex items-center justify-center">
      
      {/* The Glowing Interior (Always underneath, revealed when doors open) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {status === 'SAFE' && (
          <div className="w-[90%] h-[70%] border-2 border-green-500/50 rounded-lg flex items-center justify-center bg-green-900/10 shadow-[inset_0_0_20px_rgba(74,222,128,0.2)]">
            <span className="text-6xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-green-400 drop-shadow-[0_0_25px_rgba(74,222,128,1)]">SAFE</span>
          </div>
        )}
        {status === 'ELIMINATE' && (
          <div className="w-[90%] h-[70%] border-2 border-red-600/50 rounded-lg flex items-center justify-center bg-red-900/10 shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]">
            <span className="text-5xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-red-500 drop-shadow-[0_0_25px_rgba(220,38,38,1)] animate-pulse">ELIMINATE</span>
          </div>
        )}
      </div>

      {/* Top Metallic Door */}
      <div className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-neutral-300 to-neutral-400 border-b border-neutral-600 shadow-lg transition-transform duration-700 ease-in-out z-10 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-500 rounded-full"></div>
      </div>

      {/* Bottom Metallic Door */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-neutral-400 to-neutral-500 border-t border-neutral-300 shadow-lg transition-transform duration-700 ease-in-out z-10 flex items-start justify-center pt-2 ${isOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        {/* Lock Mechanism */}
        <div className="w-16 h-4 bg-neutral-800 rounded shadow-inner border border-neutral-600 flex items-center justify-center">
          <div className="w-3 h-1 bg-neutral-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default function GameBoard() {
  const { 
    phase, players, timer, timerRunning, 
    startGame, startInterrogation, goToChoicePhase, makeChoice, addPlayer, removePlayer, briefcaseStatus
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [caseIsOpen, setCaseIsOpen] = useState(false);

  useEffect(() => {
    if (phase === 'peek') sfx.begin();
    if (phase === 'gameover') sfx.gameOver();
    if (phase === 'lobby' || phase === 'result' || phase === 'choice') setCaseIsOpen(false);
  }, [phase]);

  useEffect(() => {
    if (!timerRunning || timer === 0) {
      if (timer === 0 && phase === 'interrogation') goToChoicePhase();
      return;
    }
    if (timer <= 5) sfx.timerUrgent();
    else if (timer % 5 === 0) sfx.timerTick();
  }, [timer, timerRunning, phase, goToChoicePhase]);

  const handleAction = (actionCallback, soundEffect = sfx.tap) => {
    sfx.init();
    if (soundEffect) soundEffect.bind(sfx)();
    if (actionCallback) actionCallback();
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      handleAction(() => addPlayer(newPlayerName.trim()), sfx.addPlayer);
      setNewPlayerName('');
    }
  };

  const handleOpenCase = () => {
    handleAction(null, sfx.latchOpen);
    setCaseIsOpen(true);
    // Auto-start interrogation slightly after the visual reveal opens
    setTimeout(() => {
      startInterrogation();
    }, 1500); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black font-sans selection:bg-none">
      
      <div className="absolute top-8 text-center opacity-80">
        <h1 className="text-xl font-bold tracking-widest text-neutral-400 uppercase">Briefcase Bluff</h1>
        <p className="text-xs text-neutral-600 tracking-widest mt-1 uppercase">Phase: <span className="text-white font-bold">{phase}</span></p>
      </div>

      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm gap-4 mt-12 animate-fade-in">
          <div className="flex w-full gap-2 rounded-xl">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter Player Name..."
              className="flex-1 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white outline-none focus:border-neutral-500 transition-colors"
            />
            <button 
              onClick={handleAddPlayer} 
              className="px-6 py-4 bg-neutral-800 rounded-xl font-bold text-xl active:scale-95 transition-transform"
            >
              +
            </button>
          </div>
          <div className="w-full mt-4 max-h-60 overflow-y-auto pr-2">
            {players.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 mb-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                <span className="text-lg font-medium">{p.name}</span>
                <button 
                  onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} 
                  className="text-neutral-500 hover:text-red-400 font-bold active:scale-95 transition-transform"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full mt-6 px-6 py-4 bg-white text-black rounded-xl font-bold text-lg active:scale-95 transition-all disabled:opacity-30"
          >
            START GAME
          </button>
        </div>
      )}

      {phase === 'peek' && (
        <div className="flex flex-col items-center text-center animate-fade-in w-full max-w-sm">
          <p className="text-lg mb-2 text-neutral-400">
            <span className="font-bold text-white text-xl">{players[0]?.name}</span>, unlock to view.
          </p>
          
          <ThinBriefcase isOpen={caseIsOpen} status={briefcaseStatus} />

          <button 
            onClick={handleOpenCase}
            className={`w-full py-5 border border-neutral-600 text-white rounded-xl font-extrabold text-lg tracking-widest active:scale-95 transition-all ${caseIsOpen ? 'opacity-0 h-0 p-0 overflow-hidden' : 'bg-neutral-800'}`}
          >
            UNLOCK CASE
          </button>
        </div>
      )}

      {phase === 'interrogation' && (
        <div className="flex flex-col items-center animate-fade-in w-full">
          <div className="text-neutral-500 tracking-widest text-xs mb-2 uppercase">Pass device to</div>
          <div className="text-2xl font-bold text-white mb-6">{players[1]?.name}</div>
          
          <ThinBriefcase isOpen={caseIsOpen} status={briefcaseStatus} />

          <div className={`text-8xl font-mono mt-6 mb-8 transition-colors duration-300 ${timer <= 5 ? 'text-red-500 scale-105' : 'text-neutral-300'}`}>
            {timer}
          </div>
          <button 
            onClick={() => handleAction(goToChoicePhase)}
            className="px-6 py-3 bg-neutral-900 text-neutral-500 rounded-full font-bold active:scale-95 transition-transform border border-neutral-800"
          >
            Skip Timer
          </button>
        </div>
      )}

      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <p className="text-xl mb-12 text-center text-neutral-400">
            <span className="font-bold text-white text-3xl">{players[1]?.name}</span><br/><br/>Make your choice.
          </p>
          <div className="flex flex-col w-full gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.steal)}
              className="w-full py-6 bg-red-900/50 border border-red-700 text-white rounded-xl font-extrabold text-2xl tracking-[0.2em] active:scale-95 transition-all"
            >
              STEAL
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.leave)}
              className="w-full py-6 bg-neutral-800 border border-neutral-600 text-white rounded-xl font-extrabold text-2xl tracking-[0.2em] active:scale-95 transition-all"
            >
              LEAVE
            </button>
          </div>
        </div>
      )}

      {phase === 'gameover' && (
        <div className="flex flex-col items-center animate-fade-in text-center">
          <h2 className="text-6xl font-extrabold text-white mb-4 tracking-wider">{players[0]?.name}</h2>
          <div className="text-xl text-green-500 tracking-[0.3em] font-bold mb-12">SURVIVES</div>
          
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl active:scale-95 transition-transform"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}