import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// The Bulletproof, Native CSS 3D Flip Card
const FlipCard = ({ isFlipped, status }) => {
  return (
    <div className="my-12 relative" style={{ perspective: '1200px', width: '16rem', height: '24rem' }}>
      <div 
        className="w-full h-full relative" 
        style={{ 
          transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        
        {/* Front of Card (The 'Hold' side) */}
        <div 
          className="absolute inset-0 w-full h-full bg-neutral-900 rounded-3xl border border-neutral-700 shadow-2xl flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
           {/* Minimalist fingerprint/hold icon graphic */}
           <div className="w-20 h-20 rounded-full border-2 border-neutral-700 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-neutral-600 animate-pulse"></div>
           </div>
           <p className="mt-8 text-neutral-500 font-bold tracking-[0.3em] text-sm uppercase">Hold to Reveal</p>
        </div>

        {/* Back of Card (The Secret) */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)] ${status === 'SAFE' ? 'bg-emerald-950 border-2 border-emerald-600' : 'bg-red-950 border-2 border-red-600'}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {status === 'SAFE' ? (
            <span className="text-5xl font-black tracking-widest text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]">SAFE</span>
          ) : (
            <span className="text-4xl font-black tracking-widest text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse">ELIMINATE</span>
          )}
        </div>

      </div>
    </div>
  );
};

export default function GameBoard() {
  const { 
    phase, players, winStreak, initialRoster,
    startGame, goToChoicePhase, makeChoice, nextRound, addPlayer, removePlayer, cardStatus, roundResult
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [isHoldingCard, setIsHoldingCard] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);

  useEffect(() => {
    if (phase === 'peek') setHasPeeked(false);
  }, [phase]);

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

  // Touch Handlers for the Card
  const onHoldStart = (e) => {
    if (e.cancelable) e.preventDefault(); // Prevents mobile screen highlighting/magnifier
    sfx.init();
    sfx.tap();
    setIsHoldingCard(true);
    setHasPeeked(true);
  };

  const onHoldEnd = (e) => {
    if (e.cancelable) e.preventDefault();
    if (isHoldingCard) sfx.tap(); // Play sound when closing
    setIsHoldingCard(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black font-sans text-white select-none touch-none overflow-hidden">
      
      {/* --- LOBBY --- */}
      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <h1 className="text-3xl font-black tracking-[0.2em] mb-12 uppercase text-white">The Deck</h1>
          
          <div className="w-full flex gap-2 mb-8">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Player Name"
              className="flex-1 p-4 bg-neutral-900 border-b-2 border-neutral-700 text-white outline-none focus:border-white transition-colors text-center text-lg font-bold"
            />
            <button onClick={handleAddPlayer} className="px-6 bg-white text-black font-black text-2xl">+</button>
          </div>
          
          <div className="w-full space-y-2 mb-12">
            {players.map((p) => (
              <div key={p.id} className="flex justify-between items-center py-4 px-6 bg-neutral-900/50 rounded-lg">
                <span className="font-bold tracking-widest text-neutral-300">{p.name}</span>
                <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-red-500 font-bold">✕</button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full py-6 bg-white text-black font-black text-xl tracking-[0.2em] disabled:opacity-20 active:scale-95 transition-transform"
          >
            START MATCH
          </button>
        </div>
      )}

      {/* --- PEEK PHASE (HOLD TO REVEAL) --- */}
      {phase === 'peek' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Pass phone to</p>
          <h2 className="text-4xl font-black tracking-widest uppercase text-white">{players[0]?.name}</h2>

          <div 
            onMouseDown={onHoldStart} onMouseUp={onHoldEnd} onMouseLeave={onHoldEnd}
            onTouchStart={onHoldStart} onTouchEnd={onHoldEnd}
            className="cursor-pointer"
          >
            <FlipCard isFlipped={isHoldingCard} status={cardStatus} />
          </div>

          <button 
            onClick={() => handleAction(goToChoicePhase)}
            disabled={!hasPeeked || isHoldingCard}
            className={`w-full max-w-xs py-5 border-2 border-white text-white font-bold tracking-[0.2em] transition-opacity duration-300 ${!hasPeeked || isHoldingCard ? 'opacity-0 pointer-events-none' : 'opacity-100 active:bg-white active:text-black'}`}
          >
            HIDE & CONTINUE
          </button>
        </div>
      )}

      {/* --- CHOICE PHASE --- */}
      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Pass phone to</p>
          <h2 className="text-4xl font-black tracking-widest uppercase text-white mb-12">{players[1]?.name}</h2>

          <FlipCard isFlipped={false} status={cardStatus} />

          <p className="text-neutral-500 tracking-widest uppercase text-sm mb-6 mt-4">Make Your Choice</p>

          <div className="flex w-full max-w-xs gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="flex-1 py-6 bg-neutral-900 border border-neutral-700 text-white font-black tracking-widest active:bg-white active:text-black transition-colors"
            >
              TAKE
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="flex-1 py-6 bg-neutral-900 border border-neutral-700 text-white font-black tracking-widest active:bg-white active:text-black transition-colors"
            >
              PASS
            </button>
          </div>
        </div>
      )}

      {/* --- RESOLUTION PHASE --- */}
      {phase === 'resolution' && roundResult && (
        <div className="flex flex-col items-center w-full animate-fade-in text-center">
          
          <FlipCard isFlipped={true} status={cardStatus} />

          <div className="mt-6 mb-12">
            <h2 className="text-5xl font-black text-white uppercase tracking-widest mb-2">{roundResult.loser.name}</h2>
            <p className="text-red-500 font-bold tracking-[0.3em] uppercase">Eliminated</p>
          </div>

          <button 
            onClick={() => handleAction(nextRound)}
            className="w-full max-w-xs py-5 bg-white text-black font-black tracking-[0.2em] active:scale-95 transition-transform"
          >
            NEXT MATCH
          </button>
        </div>
      )}

      {/* --- GAMEOVER (TOURNAMENT WINNER) --- */}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center animate-fade-in text-center mt-20">
          <div className="w-24 h-24 bg-white text-black flex items-center justify-center rounded-full text-4xl mb-8">👑</div>
          <h2 className="text-6xl font-black text-white uppercase tracking-widest mb-4">{players[0]?.name}</h2>
          <p className="text-emerald-500 font-bold tracking-[0.4em] mb-20 uppercase">Champion</p>
          
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-10 py-5 border-2 border-white text-white font-bold tracking-[0.2em] active:bg-white active:text-black transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}