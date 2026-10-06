import { GameDifficulty, GhostChallengeData, LanguageId, WordCategory, WordItem } from '../types';
import { getCategoryMeta } from './i18n';

export const CATEGORY_LABELS = {
  videojuegos: { name: 'Videojuegos', icon: '🎮', desc: 'Clásicos y leyendas del gaming' },
  cine_retro: { name: 'Cine & TV Retro', icon: '🎬', desc: 'Películas y series icónicas' },
  ciencia: { name: 'Ciencia & Espacio', icon: '🚀', desc: 'Cosmos, física y astronomía' },
  animales: { name: 'Fauna Salvaje', icon: '🐾', desc: 'Criaturas asombrosas' },
  paises: { name: 'Países y Ciudades', icon: '🌍', desc: 'Geografía del planeta' },
  programacion: { name: 'Código & Tech', icon: '💻', desc: 'Computación y retro bytes' },
  mitologia: { name: 'Mitos & Fantasía', icon: '⚔️', desc: 'Dioses, monstruos y leyendas' },
  anime: { name: 'Anime & Manga', icon: '⚡', desc: 'Series animadas legendarias' },
  gastronomia: { name: 'Gastronomía', icon: '🍕', desc: 'Platillos deliciosos del mundo' },
  personalizada: { name: 'Personalizada', icon: '✨', desc: 'Palabra creada por jugador' }
};

export const WORD_DATABASE: WordItem[] = [
  // ================= ESPAÑOL (es) =================
  { id: 'es_v1', lang: 'es', word: 'PACMAN', category: 'videojuegos', hint: 'Comecocos amarillo que huye de fantasmas', difficulty: 'easy', funFact: 'Creado por Toru Iwatani en 1980' },
  { id: 'es_v2', lang: 'es', word: 'TETRIS', category: 'videojuegos', hint: 'Bloques geométricos que caen sin cesar', difficulty: 'easy', funFact: 'Inventado por Alexey Pajitnov en la URSS' },
  { id: 'es_v3', lang: 'es', word: 'ZELDA', category: 'videojuegos', hint: 'Princesa de Hyrule rescatada por Link', difficulty: 'easy', funFact: 'Nombrada en honor a Zelda Fitzgerald' },
  { id: 'es_v4', lang: 'es', word: 'METROID', category: 'videojuegos', hint: 'Cazarrecompensas Samus Aran en traje espacial', difficulty: 'normal', funFact: 'Uno de los primeros juegos con protagonista femenina' },
  { id: 'es_v5', lang: 'es', word: 'CASTLEVANIA', category: 'videojuegos', hint: 'Látigo sagrado contra el conde Drácula', difficulty: 'normal', funFact: 'Pionero del género Metroidvania' },
  { id: 'es_v6', lang: 'es', word: 'CHRONO TRIGGER', category: 'videojuegos', hint: 'RPG legendario de viajes en el tiempo', difficulty: 'hard', funFact: 'Desarrollado por el Dream Team de Square y Enix' },
  { id: 'es_v7', lang: 'es', word: 'CYBERPUNK', category: 'videojuegos', hint: 'Futuro distópico con implantes y cromo', difficulty: 'normal', funFact: 'Ambientado en la caótica Night City' },
  { id: 'es_v8', lang: 'es', word: 'DONKEY KONG', category: 'videojuegos', hint: 'Gorila lanzador de barriles en vigas rojas', difficulty: 'normal', funFact: 'Primera aparición de Mario (Jumpman)' },

  { id: 'es_c1', lang: 'es', word: 'VOLVER AL FUTURO', category: 'cine_retro', hint: 'Un DeLorean impulsado por 1.21 gigavatios', difficulty: 'normal', funFact: 'Marty McFly y el Doc Brown en 1985' },
  { id: 'es_c2', lang: 'es', word: 'STAR WARS', category: 'cine_retro', hint: 'Caballeros Jedi, sables de luz y la Fuerza', difficulty: 'easy', funFact: 'Episodio IV se estrenó en 1977' },
  { id: 'es_c3', lang: 'es', word: 'CAZAFANTASMAS', category: 'cine_retro', hint: 'Protones y rayos para atrapar a Pegajoso', difficulty: 'normal', funFact: '¿A quién vas a llamar?' },
  { id: 'es_c4', lang: 'es', word: 'MATRIX', category: 'cine_retro', hint: 'Pastilla roja o pastilla azul con Morfeo', difficulty: 'easy', funFact: 'Popularizó el efecto Bullet Time' },
  { id: 'es_c5', lang: 'es', word: 'BLADE RUNNER', category: 'cine_retro', hint: 'Rick Deckard persiguiendo replicantes Nexus-6', difficulty: 'hard', funFact: 'Lágrimas en la lluvia como despedida' },
  { id: 'es_c6', lang: 'es', word: 'TERMINATOR', category: 'cine_retro', hint: 'Ciborg asesino T-800 enviado desde el futuro', difficulty: 'easy', funFact: 'Hasta la vista, baby' },

  { id: 'es_s1', lang: 'es', word: 'SUPERNOVA', category: 'ciencia', hint: 'Explosión cataclísmica de una estrella masiva', difficulty: 'easy', funFact: 'Puede brillar más que una galaxia entera' },
  { id: 'es_s2', lang: 'es', word: 'AGUJERO NEGRO', category: 'ciencia', hint: 'Región del espacio donde ni la luz puede escapar', difficulty: 'normal', funFact: 'El horizonte de sucesos marca su frontera' },
  { id: 'es_s3', lang: 'es', word: 'TELESCOPIO', category: 'ciencia', hint: 'Instrumento óptico para escudriñar galaxias', difficulty: 'easy', funFact: 'James Webb y Hubble exploran lo profundo' },
  { id: 'es_s4', lang: 'es', word: 'RELATIVIDAD', category: 'ciencia', hint: 'Teoría de Einstein sobre el espacio-tiempo curvado', difficulty: 'hard', funFact: 'E = mc² describe la masa y la energía' },

  { id: 'es_a1', lang: 'es', word: 'ORNITORRINCO', category: 'animales', hint: 'Mamífero semiacuático con pico de pato que pone huevos', difficulty: 'hard', funFact: 'Produce veneno en sus patas traseras' },
  { id: 'es_a2', lang: 'es', word: 'CAMALEON', category: 'animales', hint: 'Reptil con ojos independientes que cambia de camuflaje', difficulty: 'normal', funFact: 'Su lengua puede medir el doble de su cuerpo' },
  { id: 'es_a3', lang: 'es', word: 'GUEPARDO', category: 'animales', hint: 'El mamífero terrestre más veloz de la sabana', difficulty: 'easy', funFact: 'Alcanza los 100 km/h en solo 3 segundos' },
  { id: 'es_a4', lang: 'es', word: 'AXOLOTE', category: 'animales', hint: 'Anfibio mexicano capaz de regenerar sus extremidades', difficulty: 'normal', funFact: 'Símbolo biológico de la eterna juventud' },

  { id: 'es_p1', lang: 'es', word: 'ISLANDIA', category: 'paises', hint: 'Isla nórdica de hielo, géiseres y volcanes activos', difficulty: 'easy', funFact: 'No tiene mosquitos ni ejército' },
  { id: 'es_p2', lang: 'es', word: 'JAPON', category: 'paises', hint: 'Archipiélago del sol naciente y los cerezos en flor', difficulty: 'easy', funFact: 'Compuesto por más de 6.800 islas' },
  { id: 'es_p3', lang: 'es', word: 'AUSTRALIA', category: 'paises', hint: 'Tierra de canguros, koalas y la Gran Barrera de Coral', difficulty: 'normal', funFact: 'Es un continente y país a la vez' },
  { id: 'es_p4', lang: 'es', word: 'SINGAPUR', category: 'paises', hint: 'Ciudad-estado futurista del sudeste asiático', difficulty: 'hard', funFact: 'Hogar de Gardens by the Bay' },

  { id: 'es_t1', lang: 'es', word: 'JAVASCRIPT', category: 'programacion', hint: 'Lenguaje fundamental de la web moderna', difficulty: 'normal', funFact: 'Creado en solo 10 días por Brendan Eich' },
  { id: 'es_t2', lang: 'es', word: 'ALGORITMO', category: 'programacion', hint: 'Conjunto ordenado de pasos para resolver un problema', difficulty: 'normal', funFact: 'Nombrado en honor a Al-Juarismi' },
  { id: 'es_t3', lang: 'es', word: 'RECURSIVIDAD', category: 'programacion', hint: 'Función que se llama a sí misma hasta una condición base', difficulty: 'hard', funFact: 'Debes entenderla para entenderla' },
  { id: 'es_t4', lang: 'es', word: 'PIXEL', category: 'programacion', hint: 'Mínima unidad homogénea de color en una pantalla', difficulty: 'easy', funFact: 'Acrónimo de Picture Element' },

  { id: 'es_m1', lang: 'es', word: 'MINOTAURO', category: 'mitologia', hint: 'Monstruo mitad hombre y mitad toro en el laberinto', difficulty: 'normal', funFact: 'Vencido por el héroe Teseo' },
  { id: 'es_m2', lang: 'es', word: 'EXCALIBUR', category: 'mitologia', hint: 'Espada mágica legendaria del Rey Arturo', difficulty: 'easy', funFact: 'Entregada por la Dama del Lago' },
  { id: 'es_m3', lang: 'es', word: 'VALKIRIA', category: 'mitologia', hint: 'Doncella guerrera nórdica que guía al Valhalla', difficulty: 'normal', funFact: 'Servidoras del dios Odín' },
  { id: 'es_m4', lang: 'es', word: 'RAGNAROK', category: 'mitologia', hint: 'La batalla del fin del mundo nórdico', difficulty: 'hard', funFact: 'Renacerá un nuevo mundo verde' },

  { id: 'es_an1', lang: 'es', word: 'DRAGON BALL', category: 'anime', hint: 'Búsqueda de 7 esferas mágicas para invocar a Shenlong', difficulty: 'easy', funFact: 'Obra maestra de Akira Toriyama' },
  { id: 'es_an2', lang: 'es', word: 'EVANGELION', category: 'anime', hint: 'Robots biomecánicos EVA para enfrentar a los Ángeles', difficulty: 'normal', funFact: 'Dirigida por Hideaki Anno' },
  { id: 'es_an3', lang: 'es', word: 'ONE PIECE', category: 'anime', hint: 'Piratas del Sombrero de Paja tras el tesoro legendario', difficulty: 'easy', funFact: 'El manga más vendido' },

  { id: 'es_g1', lang: 'es', word: 'GUACAMOLE', category: 'gastronomia', hint: 'Salsa mexicana de aguacate, lima y cilantro', difficulty: 'easy', funFact: 'Originario de los aztecas' },
  { id: 'es_g2', lang: 'es', word: 'TIRAMISU', category: 'gastronomia', hint: 'Postre italiano con capas de café y mascarpone', difficulty: 'normal', funFact: 'Significa "levántame el ánimo"' },
  { id: 'es_g3', lang: 'es', word: 'CROISSANT', category: 'gastronomia', hint: 'Hojaldre mantequilloso con forma de medialuna', difficulty: 'normal', funFact: 'Nació en Viena antes de París' },

  // ================= ENGLISH (en) =================
  { id: 'en_v1', lang: 'en', word: 'PACMAN', category: 'videojuegos', hint: 'Yellow arcade hero eating dots and ghost chasers', difficulty: 'easy', funFact: 'Created by Toru Iwatani in 1980' },
  { id: 'en_v2', lang: 'en', word: 'CYBERPUNK', category: 'videojuegos', hint: 'Futuristic dystopian RPG set in Night City', difficulty: 'normal', funFact: 'Features high-tech and low-life cyberware' },
  { id: 'en_v3', lang: 'en', word: 'CHRONO TRIGGER', category: 'videojuegos', hint: 'Legendary time-traveling SNES RPG adventure', difficulty: 'hard', funFact: 'Developed by the Square & Enix Dream Team' },
  { id: 'en_c1', lang: 'en', word: 'BACK TO THE FUTURE', category: 'cine_retro', hint: 'Time traveling DeLorean powered by 1.21 gigawatts', difficulty: 'normal', funFact: 'Marty McFly and Doc Brown in 1985' },
  { id: 'en_c2', lang: 'en', word: 'BLADE RUNNER', category: 'cine_retro', hint: 'Deckard hunting Nexus-6 replicants in cyberpunk LA', difficulty: 'hard', funFact: 'Tears in rain monologue by Rutger Hauer' },
  { id: 'en_s1', lang: 'en', word: 'BLACK HOLE', category: 'ciencia', hint: 'Region of spacetime with gravitational pull light cannot escape', difficulty: 'normal', funFact: 'Event horizon defines the boundary' },
  { id: 'en_s2', lang: 'en', word: 'SUPERNOVA', category: 'ciencia', hint: 'Cataclysmic explosion of a dying massive star', difficulty: 'easy', funFact: 'Can outshine an entire galaxy for weeks' },
  { id: 'en_a1', lang: 'en', word: 'PLATYPUS', category: 'animales', hint: 'Egg-laying semi-aquatic mammal with a duck bill', difficulty: 'hard', funFact: 'Males have venomous ankle spurs' },
  { id: 'en_a2', lang: 'en', word: 'CHAMELEON', category: 'animales', hint: 'Lizard with independently mobile eyes and camouflage', difficulty: 'normal', funFact: 'Its tongue can shoot out at lightning speed' },
  { id: 'en_p1', lang: 'en', word: 'ICELAND', category: 'paises', hint: 'Nordic island of ice, geysers, and volcanoes', difficulty: 'easy', funFact: 'Has zero mosquitoes and no standing army' },
  { id: 'en_p2', lang: 'en', word: 'SINGAPORE', category: 'paises', hint: 'Futuristic island city-state in Southeast Asia', difficulty: 'hard', funFact: 'Home to the iconic Gardens by the Bay' },
  { id: 'en_t1', lang: 'en', word: 'ALGORITHM', category: 'programacion', hint: 'Step-by-step mathematical procedure for solving problems', difficulty: 'normal', funFact: 'Named after Persian polymath Al-Khwarizmi' },
  { id: 'en_t2', lang: 'en', word: 'RECURSION', category: 'programacion', hint: 'A function that calls itself until reaching a base condition', difficulty: 'hard', funFact: 'To understand recursion, you must understand recursion' },
  { id: 'en_m1', lang: 'en', word: 'MINOTAUR', category: 'mitologia', hint: 'Mythical creature with bull head inside the Labyrinth', difficulty: 'normal', funFact: 'Defeated by Theseus with Ariadne thread' },
  { id: 'en_m2', lang: 'en', word: 'EXCALIBUR', category: 'mitologia', hint: 'Legendary sword gifted to King Arthur by the Lake Lady', difficulty: 'easy', funFact: 'Possesses mystical sovereignty' },
  { id: 'en_an1', lang: 'en', word: 'COWBOY BEBOP', category: 'anime', hint: 'Space bounty hunters with jazz and blues vibes', difficulty: 'hard', funFact: 'See You Space Cowboy...' },
  { id: 'en_g1', lang: 'en', word: 'GUACAMOLE', category: 'gastronomia', hint: 'Creamy avocado dip with lime, onions, and cilantro', difficulty: 'easy', funFact: 'Dates back to the Aztec civilization' },

  // ================= DEUTSCH (de) =================
  { id: 'de_v1', lang: 'de', word: 'TETRIS', category: 'videojuegos', hint: 'Kultiges Block-Puzzlespiel aus fallenden Formen', difficulty: 'easy', funFact: 'Entwickelt von Alexei Paschitnow' },
  { id: 'de_c1', lang: 'de', word: 'ZURUECK IN DIE ZUKUNFT', category: 'cine_retro', hint: 'Zeitreise mit einem DeLorean und Doc Brown', difficulty: 'hard', funFact: 'Kultfilm von Robert Zemeckis' },
  { id: 'de_s1', lang: 'de', word: 'SCHWARZES LOCH', category: 'ciencia', hint: 'Extrem dichte Masse, der nicht einmal Licht entkommt', difficulty: 'normal', funFact: 'Der Ereignishorizont markiert die Grenze' },
  { id: 'de_s2', lang: 'de', word: 'SUPERNOVA', category: 'ciencia', hint: 'Gigantische Explosion am Lebensende eines Sterns', difficulty: 'easy', funFact: 'Leuchtet heller als Milliarden Sonnen' },
  { id: 'de_a1', lang: 'de', word: 'SCHNABELTIER', category: 'animales', hint: 'Eierlegendes Säugetier mit Entenschnabel aus Australien', difficulty: 'hard', funFact: 'Männchen besitzen Giftsporne' },
  { id: 'de_a2', lang: 'de', word: 'CHAMAELION', category: 'animales', hint: 'Schuppenkriechtier mit Zunge und Farbwechsel', difficulty: 'normal', funFact: 'Augen bewegen sich unabhängig' },
  { id: 'de_p1', lang: 'de', word: 'ISLAND', category: 'paises', hint: 'Nordische Insel aus Eis, Geysiren und Vulkanen', difficulty: 'easy', funFact: 'Hat keine Mücken' },
  { id: 'de_p2', lang: 'de', word: 'DEUTSCHLAND', category: 'paises', hint: 'Land im Herzen Europas mit vielen Burgen und Wäldern', difficulty: 'easy', funFact: 'Hauptstadt ist Berlin' },
  { id: 'de_t1', lang: 'de', word: 'ALGORITHMUS', category: 'programacion', hint: 'Eindeutige Handlungsvorschrift zur Problemlösung', difficulty: 'normal', funFact: 'Grundlage aller Computerprogramme' },
  { id: 'de_m1', lang: 'de', word: 'MINOTAURUS', category: 'mitologia', hint: 'Mischwesen aus Mensch und Stier im Labyrinth', difficulty: 'normal', funFact: 'Besiegt von Theseus auf Kreta' },
  { id: 'de_g1', lang: 'de', word: 'APFELSTRUDEL', category: 'gastronomia', hint: 'Beliebte Mehlspeise mit Äpfeln, Zimt und Rosinen', difficulty: 'normal', funFact: 'Klassiker der Wiener Küche' },

  // ================= FRANÇAIS (fr) =================
  { id: 'fr_v1', lang: 'fr', word: 'PACMAN', category: 'videojuegos', hint: 'Camembert jaune glouton qui fuit les fantômes', difficulty: 'easy', funFact: 'Créé en 1980 par Toru Iwatani' },
  { id: 'fr_c1', lang: 'fr', word: 'RETOUR VERS LE FUTUR', category: 'cine_retro', hint: 'Voyage temporel en DeLorean avec Marty et Doc', difficulty: 'hard', funFact: 'Vitesse requise : 88 miles par heure' },
  { id: 'fr_s1', lang: 'fr', word: 'TROU NOIR', category: 'ciencia', hint: 'Objet céleste si dense que la lumière ne peut s’échapper', difficulty: 'normal', funFact: 'L’horizon des événements marque sa frontière' },
  { id: 'fr_s2', lang: 'fr', word: 'SUPERNOVA', category: 'ciencia', hint: 'Explosion cataclysmique d’une étoile massive', difficulty: 'easy', funFact: 'Peut briller plus fort qu’une galaxie' },
  { id: 'fr_a1', lang: 'fr', word: 'ORNITHORYNQUE', category: 'animales', hint: 'Mammifère ovipare avec un bec de canard', difficulty: 'hard', funFact: 'Possède des aiguillons venimeux' },
  { id: 'fr_a2', lang: 'fr', word: 'CAMÉLÉON', category: 'animales', hint: 'Reptile capable de changer de couleur', difficulty: 'normal', funFact: 'Ses yeux bougent indépendamment' },
  { id: 'fr_p1', lang: 'fr', word: 'ISLANDE', category: 'paises', hint: 'Île de glace, de geysers et de volcans', difficulty: 'easy', funFact: 'Aucun moustique n’y habite' },
  { id: 'fr_p2', lang: 'fr', word: 'FRANCE', category: 'paises', hint: 'Pays des lumières, de la tour Eiffel et du vin', difficulty: 'easy', funFact: 'Le pays le plus visité au monde' },
  { id: 'fr_t1', lang: 'fr', word: 'ALGORITHME', category: 'programacion', hint: 'Suite finie d’instructions pour résoudre un problème', difficulty: 'normal', funFact: 'Nommé d’après Al-Khwarizmi' },
  { id: 'fr_m1', lang: 'fr', word: 'MINOTAURE', category: 'mitologia', hint: 'Monstre mi-homme mi-taureau dans le labyrinthe', difficulty: 'normal', funFact: 'Vaincu par Thésée' },
  { id: 'fr_g1', lang: 'fr', word: 'CROISSANT', category: 'gastronomia', hint: 'Viennoiserie feuilletée au beurre en demi-lune', difficulty: 'easy', funFact: 'Symbole du petit déjeuner français' },

  // ================= ITALIANO (it) =================
  { id: 'it_v1', lang: 'it', word: 'SUPER MARIO', category: 'videojuegos', hint: 'Idraulico baffuto che salta sui Goomba nel Regno dei Funghi', difficulty: 'easy', funFact: 'Creato dal leggendario Shigeru Miyamoto' },
  { id: 'it_c1', lang: 'it', word: 'RITORNO AL FUTURO', category: 'cine_retro', hint: 'Viaggio nel tempo con la DeLorean di Doc Brown', difficulty: 'normal', funFact: 'Genera 1.21 gigawatt di potenza' },
  { id: 'it_s1', lang: 'it', word: 'BUCO NERO', category: 'ciencia', hint: 'Regione dello spazio-tempo da cui nulla può fuggire', difficulty: 'normal', funFact: 'L’orizzonte degli eventi ne definisce il bordo' },
  { id: 'it_a1', lang: 'it', word: 'ORNITORINCO', category: 'animales', hint: 'Mammifero con becco d’anatra che depone le uova', difficulty: 'hard', funFact: 'Originario dell’Australia' },
  { id: 'it_p1', lang: 'it', word: 'ITALIA', category: 'paises', hint: 'Penisola a forma di stivale nel Mediterraneo', difficulty: 'easy', funFact: 'Patria del Rinascimento e della pizza' },
  { id: 'it_t1', lang: 'it', word: 'ALGORITMO', category: 'programacion', hint: 'Sequenza finita di passaggi per eseguire un calcolo', difficulty: 'normal', funFact: 'Base di ogni software moderno' },
  { id: 'it_m1', lang: 'it', word: 'MINOTAURO', category: 'mitologia', hint: 'Creatura mitologica rinchiusa nel labirinto di Creta', difficulty: 'normal', funFact: 'Sconfitto da Teseo con il filo di Arianna' },
  { id: 'it_g1', lang: 'it', word: 'TIRAMISU', category: 'gastronomia', hint: 'Dolce al cucchiaio con savoiardi, caffè e mascarpone', difficulty: 'easy', funFact: 'Celebre dessert italiano in tutto il mondo' },

  // ================= PORTUGUÊS (pt) =================
  { id: 'pt_v1', lang: 'pt', word: 'PACMAN', category: 'videojuegos', hint: 'Come-come amarelo que foge dos fantasmas no labirinto', difficulty: 'easy', funFact: 'Lançado no Japão em 1980' },
  { id: 'pt_c1', lang: 'pt', word: 'DE VOLTA PARA O FUTURO', category: 'cine_retro', hint: 'Viagem no tempo num carro DeLorean com Doc e Marty', difficulty: 'hard', funFact: 'Alcança 88 milhas por hora para saltar no tempo' },
  { id: 'pt_s1', lang: 'pt', word: 'BURACO NEGRO', category: 'ciencia', hint: 'Região do espaço com gravidade extrema de onde a luz não escapa', difficulty: 'normal', funFact: 'O horizonte de eventos é sua fronteira' },
  { id: 'pt_a1', lang: 'pt', word: 'ORNITORRINCO', category: 'animales', hint: 'Mamífero semiaquático que bota ovos e tem bico de pato', difficulty: 'hard', funFact: 'Possui esporão venenoso nas patas' },
  { id: 'pt_p1', lang: 'pt', word: 'BRASIL', category: 'paises', hint: 'Maior país da América do Sul, terra do samba e futebol', difficulty: 'easy', funFact: 'Abriga a maior floresta tropical do mundo' },
  { id: 'pt_t1', lang: 'pt', word: 'ALGORITMO', category: 'programacion', hint: 'Conjunto de regras e passos ordenados para resolver problemas', difficulty: 'normal', funFact: 'Nome em homenagem a Al-Khwarizmi' },
  { id: 'pt_m1', lang: 'pt', word: 'MINOTAURO', category: 'mitologia', hint: 'Criatura com corpo de homem e cabeça de touro no labirinto', difficulty: 'normal', funFact: 'Derrotado pelo herói Teseu' },
  { id: 'pt_g1', lang: 'pt', word: 'BRIGADEIRO', category: 'gastronomia', hint: 'Doce brasileiro de chocolate, manteiga e leite condensado', difficulty: 'easy', funFact: 'Criado na década de 1940' },

  // ================= РУССКИЙ (ru) =================
  { id: 'ru_v1', lang: 'ru', word: 'ТЕТРИС', category: 'videojuegos', hint: 'Легендарная головоломка с падающими геометрическими фигурами', difficulty: 'easy', funFact: 'Создана Алексеем Пажитновым в 1984 году' },
  { id: 'ru_v2', lang: 'ru', word: 'ПАКМАН', category: 'videojuegos', hint: 'Жёлтый герой, собирающий точки в лабиринте от призраков', difficulty: 'easy', funFact: 'Культовая аркадная игра 80-х' },
  { id: 'ru_c1', lang: 'ru', word: 'МАТРИЦА', category: 'cine_retro', hint: 'Красная или синяя таблетка с Нео и Морфеусом', difficulty: 'easy', funFact: 'Популяризировала эффект замедления времени' },
  { id: 'ru_c2', lang: 'ru', word: 'ТЕРМИНАТОР', category: 'cine_retro', hint: 'Киборг-убийца T-800, прибывший из будущего', difficulty: 'normal', funFact: 'Знаменитая фраза I will be back' },
  { id: 'ru_s1', lang: 'ru', word: 'ЧЕРНАЯ ДЫРА', category: 'ciencia', hint: 'Область пространства с гравитацией, из которой не выходит даже свет', difficulty: 'normal', funFact: 'Горизонт событий отмечает её границу' },
  { id: 'ru_s2', lang: 'ru', word: 'СУПЕРНОВА', category: 'ciencia', hint: 'Мощный взрыв в конце эволюции массивной звезды', difficulty: 'easy', funFact: 'Светит ярче целой галактики' },
  { id: 'ru_a1', lang: 'ru', word: 'УТКОНОС', category: 'animales', hint: 'Водоплавающее млекопитающее с клювом, откладывающее яйца', difficulty: 'normal', funFact: 'Обитает только в Австралии' },
  { id: 'ru_a2', lang: 'ru', word: 'ХАМЕЛЕОН', category: 'animales', hint: 'Ящерица с независимыми глазами и сменой окраски', difficulty: 'normal', funFact: 'Язык стреляет с огромной скоростью' },
  { id: 'ru_p1', lang: 'ru', word: 'РОССИЯ', category: 'paises', hint: 'Самая большая по площади страна на планете', difficulty: 'easy', funFact: 'Охватывает 11 часовых поясов' },
  { id: 'ru_p2', lang: 'ru', word: 'ЯПОНИЯ', category: 'paises', hint: 'Страна восходящего солнца и цветущей сакуры', difficulty: 'easy', funFact: 'Состоит из более чем 6800 островов' },
  { id: 'ru_t1', lang: 'ru', word: 'АЛГОРИТМ', category: 'programacion', hint: 'Точный набор инструкций для решения вычислительной задачи', difficulty: 'normal', funFact: 'Назван в честь аль-Хорезми' },
  { id: 'ru_t2', lang: 'ru', word: 'ПИКСЕЛЬ', category: 'programacion', hint: 'Наименьший элемент цифрового изображения на дисплее', difficulty: 'easy', funFact: 'Сокращение от Picture Element' },
  { id: 'ru_m1', lang: 'ru', word: 'МИНОТАВР', category: 'mitologia', hint: 'Чудовище с головой быка в Критском лабиринте', difficulty: 'normal', funFact: 'Побеждён Тесеем с помощью нити Ариадны' },
  { id: 'ru_m2', lang: 'ru', word: 'ЭКСКАЛИБУР', category: 'mitologia', hint: 'Легендарный меч короля Артура', difficulty: 'hard', funFact: 'Вручен Владычицей Озера' },
  { id: 'ru_g1', lang: 'ru', word: 'ПЕЛЬМЕНИ', category: 'gastronomia', hint: 'Традиционное блюдо из теста с мясной начинкой', difficulty: 'easy', funFact: 'Популярны по всей Евразии' },

  // ================= 日本語 (ja - Romaji 8-bit style) =================
  { id: 'ja_v1', lang: 'ja', word: 'NINTENDO', category: 'videojuegos', hint: 'Kyoto no densetsu-teki gemu kaisha (Famicom, Mario)', difficulty: 'easy', funFact: '1889-nen ni Hanafuda kaisha toshite sougyou' },
  { id: 'ja_v2', lang: 'ja', word: 'POKEMON', category: 'videojuegos', hint: 'Pocket Monsters wo getto shite batoru', difficulty: 'easy', funFact: 'Satoshi Tajiri ga konchuu saishuu kara hassou' },
  { id: 'ja_v3', lang: 'ja', word: 'SHINOBI', category: 'videojuegos', hint: 'Kage no ninja senshi arcade action', difficulty: 'normal', funFact: 'Sega no meisaku arcade series' },
  { id: 'ja_c1', lang: 'ja', word: 'GODZILLA', category: 'cine_retro', hint: 'Tokyo wo osou densetsu no kyodai kaijuu', difficulty: 'easy', funFact: '1954-nen Toho eiga de hatsu toujou' },
  { id: 'ja_s1', lang: 'ja', word: 'SUPERNOVA', category: 'ciencia', hint: 'Kyodai na hoshi no saigo no daibakuhatsu', difficulty: 'normal', funFact: 'Choushinsei bakuhatsu to yobareru' },
  { id: 'ja_a1', lang: 'ja', word: 'KAMEREON', category: 'animales', hint: 'Hada no iro wo kaeru fushigi na hachuurui', difficulty: 'normal', funFact: 'Ryoutai no me ga betsubetsu ni ugoku' },
  { id: 'ja_p1', lang: 'ja', word: 'TOKYO', category: 'paises', hint: 'Nihon no shuto de sekai yuusuu no daitokai', difficulty: 'easy', funFact: 'Edo jidai kara no rekishi wo motsu' },
  { id: 'ja_t1', lang: 'ja', word: 'ALGORITHM', category: 'programacion', hint: 'Mondai kaiketsu no tame no keisan tejun', difficulty: 'normal', funFact: 'Computer no kiso to naru ginen' },
  { id: 'ja_m1', lang: 'ja', word: 'SAMURAI', category: 'mitologia', hint: 'Katana wo motta densetsu no buke senshi', difficulty: 'easy', funFact: 'Bushido no seishin wo omondiru' },
  { id: 'ja_an1', lang: 'ja', word: 'DRAGON BALL', category: 'anime', hint: '7-tsu no tama wo atsumete Shenron wo yobidasu', difficulty: 'easy', funFact: 'Toriyama Akira sensei no kessaku' },
  { id: 'ja_g1', lang: 'ja', word: 'RAMEN', category: 'gastronomia', hint: 'Nihon de daininki no men ryouri', difficulty: 'easy', funFact: 'Chiiki goto ni shouyu, miso, tonkotsu ga aru' },

  // ================= 中文 (zh - Pinyin 8-bit style) =================
  { id: 'zh_v1', lang: 'zh', word: 'TETRIS', category: 'videojuegos', hint: 'E luo si fang kuai luo xia pin jie', difficulty: 'easy', funFact: 'Chao ji jing dian de jie ji you xi' },
  { id: 'zh_v2', lang: 'zh', word: 'PACMAN', category: 'videojuegos', hint: 'Chi dou ren zai mi gong zhong tao bi you ling', difficulty: 'easy', funFact: '1980 nian Toru Iwatani chuang zuo' },
  { id: 'zh_c1', lang: 'zh', word: 'GONG FU', category: 'cine_retro', hint: 'Chuan tong zhong guo wu shu yu dian ying chuan qi', difficulty: 'easy', funFact: 'Li Xiao Long he Cheng Long de jing dian' },
  { id: 'zh_s1', lang: 'zh', word: 'HEI DONG', category: 'ciencia', hint: 'Yu zhou zhong yin li ji da lian guang dou wu fa tao yi', difficulty: 'normal', funFact: 'Shi kong qu lü de ji xian' },
  { id: 'zh_s2', lang: 'zh', word: 'CHAO XIN XING', category: 'ciencia', hint: 'Da zhi liang heng xing yan hua mo qi de bao zha', difficulty: 'normal', funFact: 'Fa chu bi yin he xi geng liang de guang mang' },
  { id: 'zh_a1', lang: 'zh', word: 'DA XIONG MAO', category: 'animales', hint: 'Hei bai xiang jian chi zhu zi de guo bao dong wu', difficulty: 'easy', funFact: 'Si chuan de te you zhen xi dong wu' },
  { id: 'zh_p1', lang: 'zh', word: 'BEIJING', category: 'paises', hint: 'Zhong guo shou du you gu gong yu chang cheng', difficulty: 'easy', funFact: 'Gu dai liu chao gu du' },
  { id: 'zh_t1', lang: 'zh', word: 'SUAN FA', category: 'programacion', hint: 'Jie jue wen ti de que ding bu zhou he ji suan fang fa', difficulty: 'normal', funFact: 'Ji suan ji ruan jian de he xin' },
  { id: 'zh_m1', lang: 'zh', word: 'SUN WU KONG', category: 'mitologia', hint: 'Qi tian da sheng hui qi shi er bian yu jin gu bang', difficulty: 'easy', funFact: 'Xi You Ji zhong de shen hua ying xiong' },
  { id: 'zh_g1', lang: 'zh', word: 'JIAO ZI', category: 'gastronomia', hint: 'Zhong guo chuan tong jie ri bi chi de xian liao mei shi', difficulty: 'easy', funFact: 'Xiang zheng tuan yuan he fu qi' }
];

export function cleanWord(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[ÁÀÂÄ]/g, 'A')
    .replace(/[ÉÈÊË]/g, 'E')
    .replace(/[ÍÌÎÏ]/g, 'I')
    .replace(/[ÓÒÔÖ]/g, 'O')
    .replace(/[ÚÙÛÜ]/g, 'U')
    .replace(/Ç/g, 'C')
    .trim();
}

export function getRandomWord(category?: WordCategory, difficulty?: GameDifficulty, lang: LanguageId = 'es'): WordItem {
  let filtered = WORD_DATABASE;

  // Filter by language first
  const langFiltered = filtered.filter(w => !w.lang || w.lang === lang);
  if (langFiltered.length > 0) {
    filtered = langFiltered;
  }

  // Filter by category
  if (category && category !== 'personalizada') {
    const catFiltered = filtered.filter(w => w.category === category);
    if (catFiltered.length > 0) {
      filtered = catFiltered;
    }
  }

  // Filter by difficulty
  if (difficulty) {
    const diffFiltered = filtered.filter(w => w.difficulty === difficulty);
    if (diffFiltered.length > 0) {
      filtered = diffFiltered;
    }
  }

  if (filtered.length === 0) {
    filtered = WORD_DATABASE;
  }

  const idx = Math.floor(Math.random() * filtered.length);
  return filtered[idx];
}

export function getDailyWord(dateStr: string, lang: LanguageId = 'es'): WordItem {
  let list = WORD_DATABASE.filter(w => !w.lang || w.lang === lang);
  if (list.length === 0) {
    list = WORD_DATABASE;
  }

  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const index = positiveHash % list.length;
  return list[index];
}

// Encoder / Decoder for Ghost multiplayer challenge codes
export function encodeGhostChallenge(data: GhostChallengeData): string {
  try {
    const jsonStr = JSON.stringify({
      c: data.creatorName.slice(0, 10),
      w: cleanWord(data.word),
      k: data.category,
      h: data.hint.slice(0, 40),
      d: data.difficulty,
      t: data.timeSeconds,
      m: data.mistakesCount,
      g: data.guessedLetters
    });
    return btoa(encodeURIComponent(jsonStr));
  } catch {
    return '';
  }
}

export function decodeGhostChallenge(code: string): GhostChallengeData | null {
  try {
    const jsonStr = decodeURIComponent(atob(code.trim()));
    const parsed = JSON.parse(jsonStr);
    if (!parsed.w) return null;

    return {
      code,
      creatorName: parsed.c || 'Rival 8-Bit',
      word: cleanWord(parsed.w),
      category: parsed.k || 'general',
      hint: parsed.h || 'Ghost Challenge',
      difficulty: parsed.d || 'normal',
      timeSeconds: parsed.t || 45,
      mistakesCount: parsed.m || 2,
      guessedLetters: parsed.g || []
    };
  } catch {
    return null;
  }
}
