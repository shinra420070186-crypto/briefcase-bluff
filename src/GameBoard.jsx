import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

export default function GameBoard() {
  const { 
    phase, players, timer, timerRunning, 
    startGame, startInterrogation, goToChoicePhase, makeChoice, addPlayer, removePlayer
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    if (phase === 'peek') sfx.begin();
    if (phase === 'gameover') sfx.gameOver();
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

  return (
    // Replaced flat background with a cinematic radial gradient
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-950 font-sans selection:bg-none">
      
      <div className="absolute top-8 text-center opacity-80">
        <h1 className="text-xl font-bold tracking-widest text-gray-300 uppercase letter-spacing-2">Briefcase Bluff</h1>
        <p className="text-xs text-gray-500 tracking-widest mt-1">PHASE: <span className="text-yellow-500 font-bold">{phase}</span></p>
      </div>

      {/* --- LOBBY PHASE --- */}
      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm gap-4 mt-12 animate-fade-in">
          <div className="flex w-full gap-2 shadow-xl rounded-xl">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter Player Name..."
              className="flex-1 p-4 rounded-xl bg-neutral-900/80 border border-neutral-700 text-white outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={handleAddPlayer} 
              className="px-6 py-4 bg-blue-600 rounded-xl font-bold text-xl active:scale-95 transition-transform shadow-lg shadow-blue-900/50"
            >
              +
            </button>
          </div>
          <div className="w-full mt-4 max-h-60 overflow-y-auto pr-2">
            {players.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 mb-3 bg-neutral-900/60 border border-neutral-800 rounded-xl shadow-md">
                <span className="text-lg font-medium">{p.name}</span>
                <button 
                  onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-900/30 text-red-400 font-bold active:scale-95 transition-transform"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 rounded-xl font-bold text-lg active:scale-95 transition-all shadow-lg shadow-green-900/50 disabled:opacity-40 disabled:grayscale"
          >
            Start Game ({players.length} Players)
          </button>
        </div>
      )}

      {/* --- PEEK PHASE --- */}
      {phase === 'peek' && (
        <div className="flex flex-col items-center text-center animate-fade-in w-full max-w-sm">
          
          {/* SVG Briefcase Icon */}
          <div className="relative mb-8 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
              <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.252a9.75 9.75 0 015.048 3.235A2.25 2.25 0 0121 10.5v8.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75v-8.25c0-.86.48-1.61 1.202-1.996A9.75 9.75 0 019.25 5.502V5.25zm1.5 0v.25c0 .284.025.563.074.836A9.76 9.76 0 0112 6c.552 0 1.09.046 1.611.132a.75.75 0 01.139-.382V5.25a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5z" clipRule="evenodd" />
            </svg>
          </div>

          <p className="text-xl mb-10 leading-relaxed text-neutral-300">
            <span className="font-bold text-blue-400 text-2xl">{players[0]?.name}</span>
            <br/>pass the case to<br/>
            <span className="font-bold text-red-400 text-2xl">{players[1]?.name}</span>
          </p>

          <button 
            onClick={() => handleAction(startInterrogation, sfx.latchOpen)}
            className="w-full py-5 bg-gradient-to-b from-yellow-600 to-yellow-700 text-black rounded-xl font-extrabold text-lg active:scale-95 transition-all shadow-[0_0_20px_rgba(202,138,4,0.4)] border-b-4 border-yellow-800"
          >
            OPEN CASE
          </button>
        </div>
      )}

      {/* --- INTERROGATION PHASE --- */}
      {phase === 'interrogation' && (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="text-gray-400 tracking-widest text-sm mb-4 uppercase">Interrogation in progress</div>
          <div className={`text-9xl font-mono mb-12 drop-shadow-2xl transition-colors duration-300 ${timer <= 5 ? 'text-red-500 scale-110' : 'text-white'}`}>
            {timer}
          </div>
          <button 
            onClick={() => handleAction(goToChoicePhase)}
            className="px-8 py-4 bg-neutral-800 text-neutral-400 rounded-full font-bold active:scale-95 transition-transform border border-neutral-700 hover:text-white"
          >
            Skip Timer
          </button>
        </div>
      )}

      {/* --- CHOICE PHASE --- */}
      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <p className="text-2xl mb-10 text-center font-light">
            <span className="font-bold text-red-400">{players[1]?.name}</span>,<br/>make your choice.
          </p>
          <div className="flex flex-col w-full gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.steal)}
              className="w-full py-6 bg-gradient-to-r from-red-700 to-red-600 rounded-xl font-extrabold text-2xl tracking-widest active:scale-95 transition-all shadow-lg shadow-red-900/40 border-b-4 border-red-800"
            >
              STEAL
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.leave)}
              className="w-full py-6 bg-gradient-to-r from-neutral-700 to-neutral-600 rounded-xl font-extrabold text-2xl tracking-widest active:scale-95 transition-all shadow-lg shadow-neutral-900/40 border-b-4 border-neutral-800"
            >
              LEAVE
            </button>
          </div>
        </div>
      )}

      {/* --- GAMEOVER PHASE --- */}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center animate-fade-in text-center">
          <div className="text-yellow-500 mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4">{players[0]?.name} WINS!</h2>
          <p className="mb-10 text-neutral-400 text-lg">The bluff has been called.</p>
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-10 py-5 bg-blue-600 rounded-full font-bold text-xl active:scale-95 transition-transform shadow-lg shadow-blue-900/50"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}