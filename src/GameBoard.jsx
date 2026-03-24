import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// The new Flip Card Component
const FlipCard = ({ isFlipped, status }) => {
  return (
    <div className="relative w-64 h-80 perspective-1000 my-8 group">
      <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front of the Card (Face Down) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-2xl border-4 border-neutral-600 shadow-xl backface-hidden flex items-center justify-center">
          <div className="text-neutral-500 text-6xl opacity-50">?</div>
          <div className="absolute inset-2 border-2 border-neutral-600/50 rounded-xl pointer-events-none"></div>
        </div>

        {/* Back of the Card (Revealed) */}
        <div className="absolute inset-0 w-full h-full rounded-2xl border-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] backface-hidden rotate-y-180 flex flex-col items-center justify-center overflow-hidden">
          {status === 'SAFE' ? (
            <div className="w-full h-full bg-green-900/40 border-green-500 flex items-center justify-center shadow-[inset_0_0_50px_rgba(74,222,128,0.3)]">
              <span className="text-5xl font-extrabold tracking-widest text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,1)]">SAFE</span>
            </div>
          ) : (
            <div className="w-full h-full bg-red-900/40 border-red-600 flex items-center justify-center shadow-[inset_0_0_50px_rgba(220,38,38,0.3)]">
              <span className="text-4xl font-extrabold tracking-widest text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,1)] animate-pulse">ELIMINATE</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default function GameBoard() {
  const { 
    phase, players, timer, timerRunning, winStreak, initialRoster,
    startGame, startInterrogation, goToChoicePhase, makeChoice, nextRound, addPlayer, removePlayer, cardStatus, roundResult
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [isHoldingCard, setIsHoldingCard] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);

  useEffect(() => {
    if (phase === 'peek') setHasPeeked(false);
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

  const onHoldStart = () => {
    sfx.init();
    sfx.tap();
    setIsHoldingCard(true);
    setHasPeeked(true);
  };

  const onHoldEnd = () => {
    sfx.tap();
    setIsHoldingCard(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-neutral-950 font-sans text-white select-none touch-none">
      
      <div className="absolute top-6 text-center opacity-80">
        <h1 className="text-xl font-bold tracking-widest text-neutral-400 uppercase">Briefcase Bluff</h1>
        <p className="text-xs text-neutral-600 tracking-widest mt-1 uppercase">Phase: <span className="text-white font-bold">{phase}</span></p>
      </div>

      {/* --- LOBBY --- */}
      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm mt-12 animate-fade-in">
          <div className="w-full flex gap-2 mb-6">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter Name..."
              className="flex-1 p-4 rounded-xl bg-neutral-900 border border-neutral-700 outline-none"
            />
            <button onClick={handleAddPlayer} className="px-6 py-4 bg-blue-600 rounded-xl font-bold text-xl">+</button>
          </div>
          
          <div className="w-full max-h-64 overflow-y-auto space-y-2 mb-6">
            {players.map((p) => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                <span className="font-bold">{p.name}</span>
                <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-red-400 font-bold">✕</button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full py-5 bg-white text-black rounded-xl font-black text-xl tracking-widest disabled:opacity-20"
          >
            START GAME
          </button>
        </div>
      )}

      {/* --- PEEK (HOLD TO REVEAL) --- */}
      {phase === 'peek' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <p className="text-center mb-4">
            <span className="text-blue-400 font-black text-2xl">{players[0]?.name}</span><br/>
            <span className="text-neutral-400">Press and hold the card to peek.</span>
          </p>

          <div 
            onMouseDown={onHoldStart} onMouseUp={onHoldEnd} onMouseLeave={onHoldEnd}
            onTouchStart={onHoldStart} onTouchEnd={onHoldEnd}
            className="cursor-pointer"
          >
            <FlipCard isFlipped={isHoldingCard} status={cardStatus} />
          </div>

          <button 
            onClick={() => handleAction(startInterrogation)}
            disabled={!hasPeeked}
            className="w-full mt-8 py-4 bg-neutral-800 text-white rounded-xl font-bold tracking-widest disabled:opacity-30 transition-opacity"
          >
            I HAVE PEEKED
          </button>
        </div>
      )}

      {/* --- INTERROGATION --- */}
      {phase === 'interrogation' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-center text-neutral-400 mb-8 uppercase tracking-widest">
            <span className="text-blue-400 font-bold">{players[0]?.name}</span> vs <span className="text-red-400 font-bold">{players[1]?.name}</span>
          </p>
          
          <FlipCard isFlipped={false} status={cardStatus} />

          <div className={`text-9xl font-mono mt-8 transition-colors ${timer <= 5 ? 'text-red-500 scale-105' : 'text-white'}`}>
            {timer}
          </div>
          <button 
            onClick={() => handleAction(goToChoicePhase)}
            className="mt-6 px-6 py-3 bg-neutral-900 text-neutral-500 rounded-full font-bold active:scale-95"
          >
            Skip Timer
          </button>
        </div>
      )}

      {/* --- CHOICE --- */}
      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <p className="text-center mb-12">
            <span className="text-red-400 font-black text-3xl">{players[1]?.name}</span><br/>
            <span className="text-neutral-400 text-lg">Make your choice.</span>
          </p>

          <FlipCard isFlipped={false} status={cardStatus} />

          <div className="flex w-full gap-4 mt-8">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="flex-1 py-8 bg-red-700 rounded-xl font-black text-2xl tracking-widest active:scale-95 transition-transform"
            >
              STEAL
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="flex-1 py-8 bg-neutral-700 rounded-xl font-black text-2xl tracking-widest active:scale-95 transition-transform"
            >
              LEAVE
            </button>
          </div>
        </div>
      )}

      {/* --- RESOLUTION --- */}
      {phase === 'resolution' && roundResult && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in text-center">
          
          <p className="text-neutral-400 mb-4 uppercase tracking-widest text-sm">The card was...</p>
          
          {/* Automatically flipped open to show the truth */}
          <FlipCard isFlipped={true} status={cardStatus} />

          <div className="mt-8 mb-12">
            <h2 className="text-4xl font-black text-red-500 uppercase">{roundResult.loser.name} LOST</h2>
            <p className="text-neutral-500 mt-2">Win Streak: {players[0]?.name === roundResult.winner.name ? winStreak + 1 : 1} / {initialRoster.length - 1}</p>
          </div>

          <button 
            onClick={() => handleAction(nextRound)}
            className="w-full py-5 bg-white text-black rounded-xl font-black text-xl tracking-widest active:scale-95"
          >
            NEXT MATCH
          </button>
        </div>
      )}

      {/* --- GAMEOVER (ULTIMATE WINNER) --- */}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center animate-fade-in text-center mt-12">
          <div className="text-green-500 mb-6 text-6xl">👑</div>
          <h2 className="text-6xl font-black text-white mb-2 uppercase">{players[0]?.name}</h2>
          <p className="text-xl font-bold tracking-[0.2em] text-green-500 mb-12">DEFEATED EVERYONE</p>
          
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-xl tracking-widest active:scale-95"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}