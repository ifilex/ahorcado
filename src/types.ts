export type LanguageId = 'es' | 'en' | 'de' | 'fr' | 'it' | 'zh' | 'ru' | 'ja' | 'pt';

export type GameMode = 'arcade' | 'classic' | 'local2p' | 'ghost' | 'daily';

export type GameDifficulty = 'easy' | 'normal' | 'hard' | 'nightmare';

export type WordCategory = 
  | 'videojuegos' 
  | 'cine_retro' 
  | 'ciencia' 
  | 'animales' 
  | 'paises' 
  | 'programacion' 
  | 'mitologia' 
  | 'anime' 
  | 'gastronomia' 
  | 'personalizada';

export interface WordItem {
  id: string;
  word: string;
  category: WordCategory;
  hint: string;
  difficulty: GameDifficulty;
  funFact?: string;
  lang?: LanguageId;
}

export type CharacterSkinId = 
  | 'pixel_knight' 
  | 'space_cadet' 
  | 'cyber_ninja' 
  | 'retro_wizard' 
  | 'pirate_skull' 
  | 'cyborg_bot';

export interface CharacterSkin {
  id: CharacterSkinId;
  name: string;
  description: string;
  price: number;
  unlocked: boolean;
  accentColor: string;
}

export type SceneryId = 
  | 'dungeon' 
  | 'cyberpunk' 
  | 'space' 
  | 'graveyard' 
  | 'arcade_bezel';

export interface SceneryTheme {
  id: SceneryId;
  name: string;
  description: string;
  price: number;
  unlocked: boolean;
  bgColor: string;
  accentColor: string;
}

export type PaletteId = 'arcade_amber' | 'cyber_neon' | 'gameboy_green' | 'pico_sunset';

export interface HighScoreEntry {
  id: string;
  initials: string;
  score: number;
  streak: number;
  difficulty: GameDifficulty;
  category: WordCategory;
  date: string;
  mode: GameMode;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardCoins: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  dateUnlocked?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
}

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  currentStreak: number;
  bestStreak: number;
  totalLettersGuessed: number;
  perfectGames: number;
  totalCoinsEarned: number;
  lastDailyDate?: string;
  dailyStreakDays: number;
}

export interface GhostChallengeData {
  code: string;
  creatorName: string;
  word: string;
  category: WordCategory;
  hint: string;
  difficulty: GameDifficulty;
  timeSeconds: number;
  mistakesCount: number;
  guessedLetters: string[];
}

export interface SoundSettings {
  sfxEnabled: boolean;
  musicEnabled: boolean;
  sfxVolume: number;
  musicVolume: number;
  vibration: boolean;
}

export interface GameSettings {
  language: LanguageId;
  crtScanlines: boolean;
  screenShake: boolean;
  palette: PaletteId;
  sound: SoundSettings;
  soundTheme: 'classic_8bit' | 'gameboy_synth' | 'arcade_fm';
}
