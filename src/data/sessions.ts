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
    date: "2024-07",
    isNew: true
  }
];
