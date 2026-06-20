export interface Session {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genres: string[];
  image: string;
  audioUrl: string;
  date: string;
  isNew?: boolean;
}

export const SESSIONS_DATA: Session[] = [
  {
    id: "dvs1",
    title: "DEEP GROOVES",
    artist: "DVS1 (MINNEAPOLIS)",
    duration: "1h 09m",
    genres: ["DEEP HOUSE"],
    image: "/session_dvs1_pattern.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2018-06.mp3",
    date: "2018-06"
  },
  {
    id: "rodhad",
    title: "SUNSET RHYTHMS",
    artist: "RØDHÅD (BERLIN)",
    duration: "48m 12s",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_rodhad_pattern.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2025/01/2025-01.mp3",
    date: "2025-01",
    isNew: true
  },
  {
    id: "blawan",
    title: "MIDNIGHT PULSE",
    artist: "BLAWAN (LONDON)",
    duration: "1h 12m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_blawan_pattern.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2017-08.mp3",
    date: "2017-08"
  },
  {
    id: "kerri",
    title: "RAW VIBRATIONS",
    artist: "KERRI CHANDLER (NEW YORK)",
    duration: "1h 00m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_kerri_pattern.png",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/01/2024-01.mp3",
    date: "2024-01"
  },
  {
    id: "analog-sync",
    title: "ANALOG SYNC",
    artist: "BEN KLOCK (BERLIN)",
    duration: "1h 03m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2024_02.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/03/2024-02.mp3",
    date: "2024-02"
  },
  {
    id: "dust-vinyl",
    title: "DUST & DIGITAL",
    artist: "THEO PARRISH (DETROIT)",
    duration: "1h 09m",
    genres: ["DEEP HOUSE"],
    image: "/session_vintage_pattern.png",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2022/08/Mass-Sessions_2024-07-online-audio-converter.com_.mp3",
    date: "2024-07"
  },
  {
    id: "autumn-grooves",
    title: "AUTUMN GROOVES",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 27m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2024_10.png",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2024-10.mp3",
    date: "2024-10"
  },
  {
    id: "cold-pulse",
    title: "COLD PULSE",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 11m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2024_12.png",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2024-12.mp3",
    date: "2024-12"
  },
  {
    id: "spring-rhythms",
    title: "SOLAR RHYTHMS",
    artist: "MASS RESIDENT (MADRID)",
    duration: "51m 25s",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2023_05.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/01/2023-05.mp3",
    date: "2023-05",
    isNew: true
  },
  {
    id: "infinite-echo",
    title: "INFINITE ECHO",
    artist: "MASS RESIDENT (MADRID)",
    duration: "59m 33s",
    genres: ["DEEP HOUSE"],
    image: "/session_2022_04.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/01/2022-08.mp3",
    date: "2022-08"
  },
  {
    id: "vernal-chords",
    title: "VERNAL CHORDS",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 09m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2022_08.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/01/2022-04.mp3",
    date: "2022-04"
  },
  {
    id: "hi-resonance",
    title: "HI RESONANCE",
    artist: "MASS RESIDENT (MADRID)",
    duration: "54m 56s",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2021_10.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/01/2021-10.mp3",
    date: "2021-10"
  },
  {
    id: "frequencies",
    title: "FREQUENCIES",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 05m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2020_08.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/01/2020-08.mp3",
    date: "2020-08"
  },
  {
    id: "vernal-sounds",
    title: "VERNAL SOUNDS",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 09m",
    genres: ["DEEP HOUSE"],
    image: "/session_2019_05.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2019-05.mp3",
    date: "2019-05"
  },
  {
    id: "spring-frequencies",
    title: "SPRING FREQUENCIES",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 13m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2018_05.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2018-05.mp3",
    date: "2018-05"
  },
  {
    id: "autumn-raw",
    title: "AUTUMN RAW",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 02m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2017_09.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2017-09.mp3",
    date: "2017-09"
  },
  {
    id: "retro-orbits",
    title: "RETRO ORBITS",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 30m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2017_12.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/07/2017-12.mp3",
    date: "2017-12"
  },
  {
    id: "organic-cell",
    title: "ORGANIC CELL",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 03m",
    genres: ["DEEP HOUSE", "TECHNO"],
    image: "/session_2017_11.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/04/2017-11.mp3",
    date: "2017-11"
  },
  {
    id: "solstice-sync",
    title: "SOLSTICE SYNC",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 26m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2015_06.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/MassSessions-2015-06.mp3",
    date: "2015-06"
  },
  {
    id: "hidden-pulse",
    title: "HIDDEN PULSE",
    artist: "MASS RESIDENT (MADRID)",
    duration: "1h 06m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_2014_04.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2014-4-BD-Hidden-Track.mp3",
    date: "2014-04"
  }
].sort((a, b) => b.date.localeCompare(a.date));
