import React, { useEffect, useRef } from 'react';
import { CharacterSkinId, SceneryId } from '../types';

interface PixelCanvasHangmanProps {
  mistakes: number;
  maxMistakes: number;
  skinId: CharacterSkinId;
  sceneryId: SceneryId;
  isWon: boolean;
  isGameOver: boolean;
  className?: string;
}

export const PixelCanvasHangman: React.FC<PixelCanvasHangmanProps> = ({
  mistakes,
  maxMistakes,
  skinId,
  sceneryId,
  isWon,
  isGameOver,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const tickRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Enable crisp pixelated scaling
    ctx.imageSmoothingEnabled = false;

    const render = () => {
      tickRef.current += 1;
      const tick = tickRef.current;

      const w = 320;
      const h = 240;
      canvas.width = w;
      canvas.height = h;

      // 1. Draw Scenery Background
      drawScenery(ctx, sceneryId, w, h, tick);

      // 2. Draw Gallows Structure
      drawGallows(ctx, mistakes, maxMistakes, sceneryId);

      // 3. Draw Character Based on Mistakes or Victory
      drawCharacter(ctx, mistakes, maxMistakes, skinId, isWon, isGameOver, tick);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [mistakes, maxMistakes, skinId, sceneryId, isWon, isGameOver]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-lg border-4 border-zinc-800 bg-black shadow-2xl ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full aspect-[4/3] max-h-[280px] sm:max-h-[340px] block"
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Subtle CRT corner effect */}
      <div className="absolute inset-0 pointer-events-none border-2 border-white/5 rounded-lg" />
    </div>
  );
};

// Helper: draw pixel rectangle
function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}

// Sceneries Renderer
function drawScenery(ctx: CanvasRenderingContext2D, scenery: SceneryId, w: number, h: number, tick: number) {
  if (scenery === 'dungeon') {
    // Dark stone dungeon
    px(ctx, 0, 0, w, h, '#0f172a');
    // Brick pattern
    for (let y = 0; y < h - 40; y += 20) {
      const offsetX = (y / 20) % 2 === 0 ? 0 : 20;
      for (let x = -20; x < w; x += 40) {
        px(ctx, x + offsetX, y, 38, 18, '#1e293b');
        px(ctx, x + offsetX, y + 17, 40, 2, '#090d16');
      }
    }
    // Floor
    px(ctx, 0, h - 40, w, 40, '#0b0f19');
    px(ctx, 0, h - 40, w, 4, '#334155');

    // Torches on walls
    [40, 280].forEach(tx => {
      // Torch base
      px(ctx, tx, 80, 6, 20, '#78350f');
      px(ctx, tx - 2, 76, 10, 6, '#451a03');
      // Animated fire particles
      const flameShift = (Math.sin(tick * 0.2 + tx) * 2);
      px(ctx, tx - 3 + flameShift, 60, 12, 16, '#f97316');
      px(ctx, tx - 1 + flameShift, 64, 8, 10, '#fde047');
      px(ctx, tx + 1, 68, 4, 4, '#ffffff');
    });

  } else if (scenery === 'cyberpunk') {
    // Cyberpunk night with neon city skyline
    px(ctx, 0, 0, w, h, '#0d0221');
    
    // Distant skyscrapers
    const buildings = [
      { x: 10, w: 35, h: 120, col: '#1f103b' },
      { x: 50, w: 45, h: 160, col: '#2a144e' },
      { x: 100, w: 40, h: 100, col: '#1b0c33' },
      { x: 200, w: 50, h: 150, col: '#261147' },
      { x: 260, w: 45, h: 110, col: '#1a0933' },
    ];
    buildings.forEach(b => {
      px(ctx, b.x, h - 40 - b.h, b.w, b.h, b.col);
      // Windows
      for (let wy = h - 35 - b.h; wy < h - 50; wy += 14) {
        for (let wx = b.x + 6; wx < b.x + b.w - 8; wx += 10) {
          const lit = (wx * wy + tick * 5) % 7 > 2;
          if (lit) px(ctx, wx, wy, 4, 6, '#06b6d4');
        }
      }
    });

    // Floor platform
    px(ctx, 0, h - 40, w, 40, '#090514');
    px(ctx, 0, h - 40, w, 4, '#ec4899');

    // Neon rain streaks
    for (let i = 0; i < 15; i++) {
      const rx = (i * 23 + tick * 6) % w;
      const ry = (i * 37 + tick * 14) % (h - 40);
      px(ctx, rx, ry, 2, 8, '#f43f5e');
    }

  } else if (scenery === 'space') {
    // Deep cosmos
    px(ctx, 0, 0, w, h, '#020617');

    // Twinkling stars
    for (let i = 0; i < 30; i++) {
      const sx = (i * 47) % w;
      const sy = (i * 29) % (h - 40);
      const twinkle = Math.sin(tick * 0.1 + i) > 0;
      px(ctx, sx, sy, twinkle ? 3 : 2, twinkle ? 3 : 2, twinkle ? '#38bdf8' : '#94a3b8');
    }

    // Distant planet
    px(ctx, 230, 30, 48, 48, '#6366f1');
    px(ctx, 240, 36, 30, 36, '#818cf8');
    px(ctx, 220, 50, 68, 6, '#c084fc'); // Rings

    // Metal station floor
    px(ctx, 0, h - 40, w, 40, '#1e293b');
    px(ctx, 0, h - 40, w, 4, '#38bdf8');
    for (let gx = 0; gx < w; gx += 40) {
      px(ctx, gx, h - 36, 2, 36, '#0f172a');
    }

  } else if (scenery === 'graveyard') {
    // Spooky graveyard
    px(ctx, 0, 0, w, h, '#051b11');

    // Full Moon
    px(ctx, 230, 25, 46, 46, '#fef08a');
    px(ctx, 236, 30, 10, 10, '#fef9c3');

    // Fog on ground
    const fogShift = Math.sin(tick * 0.05) * 10;
    px(ctx, 0 + fogShift, h - 60, w + 20, 20, '#0d3822');

    // Tombstones
    px(ctx, 30, h - 65, 24, 25, '#475569');
    px(ctx, 36, h - 72, 12, 10, '#475569');
    px(ctx, 40, h - 60, 4, 12, '#1e293b');
    px(ctx, 36, h - 56, 12, 4, '#1e293b');

    px(ctx, 270, h - 60, 26, 20, '#334155');

    // Floor
    px(ctx, 0, h - 40, w, 40, '#062013');
    px(ctx, 0, h - 40, w, 4, '#22c55e');

  } else {
    // Arcade Bezel / Retro Salon
    px(ctx, 0, 0, w, h, '#18181b');
    // Retro grid
    for (let x = 0; x < w; x += 20) {
      px(ctx, x, 0, 1, h, '#27272a');
    }
    for (let y = 0; y < h; y += 20) {
      px(ctx, 0, y, w, 1, '#27272a');
    }
    // Floor
    px(ctx, 0, h - 40, w, 40, '#111827');
    px(ctx, 0, h - 40, w, 4, '#eab308');
  }
}

// Gallows Builder based on mistakes
function drawGallows(
  ctx: CanvasRenderingContext2D,
  mistakes: number,
  maxMistakes: number,
  scenery: SceneryId
) {
  const woodColor = scenery === 'cyberpunk' ? '#475569' : '#854d0e';
  const darkWood = scenery === 'cyberpunk' ? '#1e293b' : '#543209';
  const ropeColor = scenery === 'cyberpunk' ? '#06b6d4' : '#fde047';

  // Base platform (always drawn)
  px(ctx, 50, 190, 110, 10, woodColor);
  px(ctx, 50, 197, 110, 3, darkWood);

  const ratio = mistakes / maxMistakes;

  // Step 1: Vertical Post
  if (ratio >= 0.15 || mistakes >= 1) {
    px(ctx, 80, 40, 12, 150, woodColor);
    px(ctx, 88, 40, 4, 150, darkWood);
  }

  // Step 2: Horizontal Top Beam
  if (ratio >= 0.3 || mistakes >= 2) {
    px(ctx, 80, 40, 110, 12, woodColor);
    px(ctx, 80, 48, 110, 4, darkWood);
    // Diagonal brace
    px(ctx, 92, 52, 6, 6, woodColor);
    px(ctx, 98, 58, 6, 6, woodColor);
    px(ctx, 104, 64, 6, 6, woodColor);
    px(ctx, 110, 70, 6, 6, woodColor);
  }

  // Step 3: Hanging Rope & Noose Loop
  if (ratio >= 0.45 || mistakes >= 3) {
    px(ctx, 175, 52, 4, 28, ropeColor);
    // Noose knot
    px(ctx, 173, 76, 8, 8, '#ca8a04');
  }
}

// Animated Character based on skin and game state
function drawCharacter(
  ctx: CanvasRenderingContext2D,
  mistakes: number,
  maxMistakes: number,
  skinId: CharacterSkinId,
  isWon: boolean,
  isGameOver: boolean,
  tick: number
) {
  // Anchor position under the gallows
  const charX = 167;
  let charY = 82;

  // Idle animation: breathing bounce or victory dance
  if (isWon) {
    // Jump with joy!
    charY -= Math.abs(Math.sin(tick * 0.15)) * 14;
  } else if (!isGameOver) {
    charY += Math.sin(tick * 0.08) * 1.5;
  } else {
    // Drop down when hung / lost
    charY += 12;
  }

  const ratio = mistakes / maxMistakes;
  const isDanger = maxMistakes - mistakes === 1;

  // Skin Palette Settings
  let skinBase = '#fed7aa'; // Default peach
  let armorCol = '#38bdf8';
  let accentCol = '#0284c7';
  let hatCol = '#64748b';

  if (skinId === 'pixel_knight') {
    armorCol = '#94a3b8';
    accentCol = '#475569';
    hatCol = '#cbd5e1';
  } else if (skinId === 'space_cadet') {
    armorCol = '#f8fafc';
    accentCol = '#a855f7';
    hatCol = '#38bdf8';
  } else if (skinId === 'cyber_ninja') {
    skinBase = '#18181b';
    armorCol = '#22c55e';
    accentCol = '#15803d';
    hatCol = '#18181b';
  } else if (skinId === 'retro_wizard') {
    armorCol = '#6366f1';
    accentCol = '#4338ca';
    hatCol = '#f59e0b';
  } else if (skinId === 'pirate_skull') {
    armorCol = '#dc2626';
    accentCol = '#991b1b';
    hatCol = '#18181b';
  } else if (skinId === 'cyborg_bot') {
    skinBase = '#94a3b8';
    armorCol = '#06b6d4';
    accentCol = '#0e7490';
    hatCol = '#e2e8f0';
  }

  // --- 1. HEAD & FACE ---
  // Drawn if mistakes >= 4 (or ~60% through) or if won
  if (ratio >= 0.55 || mistakes >= 4 || isWon) {
    // Head shape
    px(ctx, charX, charY, 20, 20, skinBase);

    // Headwear / Helmet
    if (skinId === 'pixel_knight') {
      // Knight Helmet
      px(ctx, charX - 2, charY - 4, 24, 10, hatCol);
      px(ctx, charX + 6, charY - 10, 8, 8, '#ef4444'); // Red plume
    } else if (skinId === 'retro_wizard') {
      // Pointy Wizard Hat
      px(ctx, charX - 4, charY - 2, 28, 6, '#4f46e5');
      px(ctx, charX, charY - 10, 20, 8, '#4f46e5');
      px(ctx, charX + 4, charY - 16, 12, 6, '#4f46e5');
      px(ctx, charX + 8, charY - 22, 4, 6, '#fde047'); // Star
    } else if (skinId === 'space_cadet') {
      // Glass visor
      px(ctx, charX + 2, charY + 4, 16, 10, '#38bdf8');
      px(ctx, charX + 4, charY + 6, 4, 4, '#ffffff'); // reflection
    } else if (skinId === 'pirate_skull') {
      // Pirate Bicorne
      px(ctx, charX - 4, charY - 6, 28, 8, '#09090b');
      px(ctx, charX + 6, charY - 4, 8, 4, '#ffffff'); // Jolly skull
    }

    // Eyes & Expression
    const eyeBlink = tick % 100 < 5;
    if (isGameOver) {
      // Dead X_X eyes
      px(ctx, charX + 4, charY + 6, 4, 4, '#ef4444');
      px(ctx, charX + 12, charY + 6, 4, 4, '#ef4444');
      // Sad tongue out
      px(ctx, charX + 8, charY + 14, 4, 4, '#f43f5e');
    } else if (isWon) {
      // Happy ^^ eyes
      px(ctx, charX + 4, charY + 5, 4, 2, '#0f172a');
      px(ctx, charX + 12, charY + 5, 4, 2, '#0f172a');
      // Big smile
      px(ctx, charX + 6, charY + 12, 8, 3, '#0f172a');
      // Crown on head!
      px(ctx, charX + 2, charY - 12, 16, 8, '#facc15');
      px(ctx, charX + 2, charY - 14, 4, 4, '#facc15');
      px(ctx, charX + 8, charY - 16, 4, 4, '#facc15');
      px(ctx, charX + 14, charY - 14, 4, 4, '#facc15');
    } else {
      // Normal or Worried eyes
      if (!eyeBlink) {
        px(ctx, charX + 4, charY + 6, 3, 4, '#09090b');
        px(ctx, charX + 13, charY + 6, 3, 4, '#09090b');
      }
      if (isDanger) {
        // Worried sweat drop!
        px(ctx, charX + 22, charY + 2 + (tick % 20) * 0.5, 3, 4, '#38bdf8');
        // O mouth
        px(ctx, charX + 8, charY + 13, 4, 4, '#09090b');
      } else {
        // Neutral mouth
        px(ctx, charX + 7, charY + 14, 6, 2, '#09090b');
      }
    }
  }

  // --- 2. TORSO / BODY ---
  // Drawn if mistakes >= 5 or isWon
  if (ratio >= 0.7 || mistakes >= 5 || isWon) {
    px(ctx, charX - 2, charY + 20, 24, 28, armorCol);
    px(ctx, charX + 2, charY + 24, 16, 20, accentCol);

    // Belt
    px(ctx, charX - 2, charY + 44, 24, 4, '#1e293b');
    px(ctx, charX + 7, charY + 43, 6, 6, '#fbbf24');
  }

  // --- 3. LEFT ARM ---
  if (ratio >= 0.8 || mistakes >= 6 || isWon) {
    if (isWon) {
      // Arm raised high!
      px(ctx, charX - 8, charY + 12, 6, 16, armorCol);
      px(ctx, charX - 8, charY + 6, 6, 6, skinBase);
    } else {
      px(ctx, charX - 8, charY + 20, 6, 22, armorCol);
      px(ctx, charX - 8, charY + 40, 6, 6, skinBase);
    }
  }

  // --- 4. RIGHT ARM ---
  if (ratio >= 0.9 || mistakes >= 7 || isWon) {
    if (isWon) {
      // Arm raised high!
      px(ctx, charX + 22, charY + 12, 6, 16, armorCol);
      px(ctx, charX + 22, charY + 6, 6, 6, skinBase);
    } else {
      px(ctx, charX + 22, charY + 20, 6, 22, armorCol);
      px(ctx, charX + 22, charY + 40, 6, 6, skinBase);
    }
  }

  // --- 5. LEGS ---
  if (ratio >= 1.0 || isGameOver || isWon) {
    // Left leg
    px(ctx, charX + 1, charY + 48, 7, 24, accentCol);
    px(ctx, charX - 1, charY + 68, 9, 6, '#0f172a'); // Boot

    // Right leg
    px(ctx, charX + 12, charY + 48, 7, 24, accentCol);
    px(ctx, charX + 12, charY + 68, 9, 6, '#0f172a'); // Boot
  }
}
