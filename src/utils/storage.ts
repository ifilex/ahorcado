import { 
  Achievement, 
  CharacterSkin, 
  CharacterSkinId, 
  DailyQuest, 
  GameSettings, 
  HighScoreEntry, 
  SceneryId, 
  SceneryTheme, 
  UserStats 
} from '../types';
import { detectUserLanguage } from './i18n';

const STORAGE_KEYS = {
  STATS: 'ahorcado_8bit_stats_v1',
  SCORES: 'ahorcado_8bit_scores_v1',
  SKINS: 'ahorcado_8bit_skins_v1',
  SCENERIES: 'ahorcado_8bit_sceneries_v1',
  ACHIEVEMENTS: 'ahorcado_8bit_achievements_v1',
  QUESTS: 'ahorcado_8bit_quests_v1',
  SETTINGS: 'ahorcado_8bit_settings_v1',
  NOTIFICATIONS: 'ahorcado_8bit_notifications_v1',
};

export const INITIAL_SKINS: CharacterSkin[] = [
  { id: 'pixel_knight', name: 'Sir Pixelot', description: 'Caballero medieval con armadura reluciente', price: 0, unlocked: true, accentColor: '#38bdf8' },
  { id: 'space_cadet', name: 'Astro Pixel', description: 'Explorador cósmico con casco reflectante', price: 150, unlocked: false, accentColor: '#a855f7' },
  { id: 'cyber_ninja', name: 'Kage 8-Bit', description: 'Guerrero cibernético con katana de neón', price: 300, unlocked: false, accentColor: '#22c55e' },
  { id: 'retro_wizard', name: 'Mago Arcano', description: 'Hechicero de 8-bit con báculo chispeante', price: 500, unlocked: false, accentColor: '#f59e0b' },
  { id: 'pirate_skull', name: 'Capitán Píxel', description: 'Lobo de mar con garfio y parche pirata', price: 750, unlocked: false, accentColor: '#ef4444' },
  { id: 'cyborg_bot', name: 'Unit-08', description: 'Androide de última generación con ojos láser', price: 1000, unlocked: false, accentColor: '#06b6d4' },
];

export const INITIAL_SCENERIES: SceneryTheme[] = [
  { id: 'dungeon', name: 'Mazmorra Pixel', description: 'Muros de piedra, antorchas encendidas y cadenas', price: 0, unlocked: true, bgColor: '#0f172a', accentColor: '#f59e0b' },
  { id: 'cyberpunk', name: 'Neo Tokio 2088', description: 'Rascacielos iluminados, lluvia y cables de fibra', price: 200, unlocked: false, bgColor: '#180828', accentColor: '#ec4899' },
  { id: 'space', name: 'Estación Orbital', description: 'Ventanal al espacio profundo con estrellas fugaces', price: 400, unlocked: false, bgColor: '#030712', accentColor: '#38bdf8' },
  { id: 'graveyard', name: 'Cementerio 8-Bit', description: 'Lápidas misteriosas con niebla y luna llena', price: 600, unlocked: false, bgColor: '#091e12', accentColor: '#4ade80' },
  { id: 'arcade_bezel', name: 'Salón Recreativo 1989', description: 'Gabinete arcade con luces de neón y monedas', price: 800, unlocked: false, bgColor: '#1c1917', accentColor: '#eab308' },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win', title: '¡Primer Rescate!', description: 'Descubre tu primera palabra con éxito', icon: '🏆', rewardCoins: 50, unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'streak_3', title: 'En Racha', description: 'Consigue una racha de 3 victorias consecutivas', icon: '🔥', rewardCoins: 100, unlocked: false, progress: 0, maxProgress: 3 },
  { id: 'streak_7', title: 'Imparable Arcade', description: 'Consigue una racha de 7 victorias seguidas', icon: '⚡', rewardCoins: 250, unlocked: false, progress: 0, maxProgress: 7 },
  { id: 'flawless', title: 'Victoria Perfecta', description: 'Adivina una palabra sin cometer ni un solo error', icon: '💎', rewardCoins: 150, unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'nightmare_slayer', title: 'Dominador de Pesadilla', description: 'Supera una partida en dificultad Pesadilla', icon: '💀', rewardCoins: 300, unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'shopaholic', title: 'Coleccionista Pixel', description: 'Desbloquea tu primer aspecto o escenario en la tienda', icon: '🛍️', rewardCoins: 100, unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'wordsmith_25', title: 'Diccionario Viviente', description: 'Descubre un total de 25 palabras', icon: '📚', rewardCoins: 400, unlocked: false, progress: 0, maxProgress: 25 },
  { id: 'ghost_buster', title: 'Retador Asíncrono', description: 'Juega o genera un reto multijugador con código', icon: '👻', rewardCoins: 120, unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'daily_champion', title: 'Fidelidad Diaria', description: 'Completa un Desafío Diario', icon: '⭐', rewardCoins: 150, unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'duel_master', title: 'Duelo de Amigos', description: 'Juega una partida multijugador 1 vs 1 local', icon: '⚔️', rewardCoins: 80, unlocked: false, progress: 0, maxProgress: 1 },
];

export const INITIAL_SCORES: HighScoreEntry[] = [
  { id: 'hs-1', initials: 'PIX', score: 4800, streak: 8, difficulty: 'nightmare', category: 'videojuegos', date: '2026-08-18', mode: 'arcade' },
  { id: 'hs-2', initials: 'NES', score: 3600, streak: 6, difficulty: 'hard', category: 'cine_retro', date: '2026-08-19', mode: 'arcade' },
  { id: 'hs-3', initials: 'GBA', score: 2900, streak: 5, difficulty: 'normal', category: 'ciencia', date: '2026-08-19', mode: 'arcade' },
  { id: 'hs-4', initials: 'BOT', score: 2100, streak: 4, difficulty: 'normal', category: 'programacion', date: '2026-08-20', mode: 'classic' },
  { id: 'hs-5', initials: 'ARC', score: 1500, streak: 3, difficulty: 'easy', category: 'animales', date: '2026-08-20', mode: 'classic' },
];

export function getStoredStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalLettersGuessed: 0,
    perfectGames: 0,
    totalCoinsEarned: 250, // Starting bonus
    dailyStreakDays: 1,
  };
}

export function saveStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

export function getStoredScores(): HighScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCORES);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_SCORES;
}

export function saveScores(scores: HighScoreEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores.slice(0, 50)));
  } catch {
    // ignore
  }
}

export function getStoredSkins(): CharacterSkin[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SKINS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_SKINS;
}

export function saveSkins(skins: CharacterSkin[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SKINS, JSON.stringify(skins));
  } catch {
    // ignore
  }
}

export function getStoredSceneries(): SceneryTheme[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCENERIES);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_SCENERIES;
}

export function saveSceneries(sceneries: SceneryTheme[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SCENERIES, JSON.stringify(sceneries));
  } catch {
    // ignore
  }
}

export function getStoredAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_ACHIEVEMENTS;
}

export function saveAchievements(achievements: Achievement[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  } catch {
    // ignore
  }
}

export function getStoredSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.language) {
        parsed.language = detectUserLanguage();
      }
      return parsed;
    }
  } catch {
    // fallback
  }
  return {
    language: detectUserLanguage(),
    crtScanlines: true,
    screenShake: true,
    palette: 'arcade_amber',
    soundTheme: 'classic_8bit',
    sound: {
      sfxEnabled: true,
      musicEnabled: false,
      sfxVolume: 0.8,
      musicVolume: 0.5,
      vibration: true,
    },
  };
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function getDailyQuests(): DailyQuest[] {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === today && Array.isArray(parsed.quests)) {
        return parsed.quests;
      }
    }
  } catch {
    // fallback
  }

  // Generate today's quests
  const quests: DailyQuest[] = [
    { id: 'q1', title: 'Descifrador Veloz', description: 'Gana 2 partidas en cualquier categoría', target: 2, current: 0, rewardCoins: 80, completed: false, claimed: false },
    { id: 'q2', title: 'Maestro de la Aventura', description: 'Alcanza una racha de 3 aciertos', target: 3, current: 0, rewardCoins: 120, completed: false, claimed: false },
    { id: 'q3', title: 'Desafío Extremo', description: 'Gana 1 partida en dificultad Difícil o Pesadilla', target: 1, current: 0, rewardCoins: 150, completed: false, claimed: false }
  ];

  try {
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify({ date: today, quests }));
  } catch {
    // ignore
  }

  return quests;
}

export function saveDailyQuests(quests: DailyQuest[]): void {
  const today = new Date().toISOString().slice(0, 10);
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify({ date: today, quests }));
  } catch {
    // ignore
  }
}
