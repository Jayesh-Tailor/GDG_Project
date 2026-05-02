export interface RecentForm {
  match: string;
  score: number | null;
  wickets: number | null;
}

export interface BattingStats {
  runs: number;
  average: number;
  strikeRate: number;
  highestScore: number;
  fifties: number;
  hundreds: number;
  matches: number;
}

export interface BowlingStats {
  wickets: number;
  economy: number;
  bestFigures: string;
  average: number;
  matches: number;
}

export interface MatchupStat {
  team: string;
  runs?: number;
  wickets?: number;
  average?: number;
}

export interface ImpactMetrics {
  deathOversStrikeRate?: number;
  dotBallPercent?: number;
  boundaryPercent?: number;
}

export interface FantasyMetrics {
  fantasyRating: number;
  consistencyScore: number;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  role: "Batsman" | "Bowler" | "All-rounder" | "Wicket-keeper";
  team: string;
  battingStyle: string;
  bowlingStyle: string;
  image: string;
  rating: number;
  injuryStatus: "Fit" | "Doubtful" | "Out";
  playingProbability: number;
  batting: BattingStats;
  bowling: BowlingStats | null;
  recentForm: RecentForm[];
  highlights: {
    bestSeason: string;
    careerHigh: string;
    awards: string[];
  };
  insights: {
    strengths: string[];
    weaknesses: string[];
    roleTag: string;
  };
  matchups: MatchupStat[];
  homeAvg: number;
  awayAvg: number;
  impact: ImpactMetrics;
  fantasy: FantasyMetrics;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  city: string;
  players: Player[];
}

export const teams: Team[] = [
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg",
    primaryColor: "#004BA0",
    secondaryColor: "#D1AB3E",
    city: "Mumbai",
    players: [
      {
        id: "rohit-sharma",
        name: "Rohit Sharma",
        age: 37,
        role: "Batsman",
        team: "Mumbai Indians",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm off-break",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316629.jpg",
        rating: 4.8,
        injuryStatus: "Fit",
        playingProbability: 98,
        batting: { runs: 6628, average: 31.17, strikeRate: 130.5, highestScore: 109, fifties: 40, hundreds: 2, matches: 243 },
        bowling: null,
        recentForm: [
          { match: "vs CSK", score: 76, wickets: null },
          { match: "vs RCB", score: 12, wickets: null },
          { match: "vs KKR", score: 55, wickets: null },
          { match: "vs DC", score: 0, wickets: null },
          { match: "vs SRH", score: 88, wickets: null },
        ],
        highlights: {
          bestSeason: "2013 – 538 runs",
          careerHigh: "109 vs KKR (2012)",
          awards: ["Orange Cap 2015", "5x IPL Champion"],
        },
        insights: {
          strengths: ["Powerplay dominator", "Pull shot specialist", "Composed under pressure"],
          weaknesses: ["Inconsistent early in innings", "Struggles with rising deliveries off stump"],
          roleTag: "Anchor / Opener",
        },
        matchups: [
          { team: "CSK", runs: 512, average: 34.1 },
          { team: "RCB", runs: 618, average: 38.6 },
          { team: "KKR", runs: 490, average: 29.4 },
        ],
        homeAvg: 38.5,
        awayAvg: 24.9,
        impact: { deathOversStrikeRate: 148.2, boundaryPercent: 52.3 },
        fantasy: { fantasyRating: 9.1, consistencyScore: 78 },
      },
      {
        id: "jasprit-bumrah",
        name: "Jasprit Bumrah",
        age: 30,
        role: "Bowler",
        team: "Mumbai Indians",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316638.jpg",
        rating: 4.9,
        injuryStatus: "Fit",
        playingProbability: 95,
        batting: { runs: 56, average: 7.0, strikeRate: 100.0, highestScore: 10, fifties: 0, hundreds: 0, matches: 120 },
        bowling: { wickets: 145, economy: 7.41, bestFigures: "5/10", average: 23.5, matches: 120 },
        recentForm: [
          { match: "vs CSK", score: null, wickets: 3 },
          { match: "vs RCB", score: null, wickets: 1 },
          { match: "vs KKR", score: null, wickets: 2 },
          { match: "vs DC", score: null, wickets: 4 },
          { match: "vs SRH", score: null, wickets: 0 },
        ],
        highlights: {
          bestSeason: "2019 – 19 wickets",
          careerHigh: "5/10 vs SRH",
          awards: ["Purple Cap 2020"],
        },
        insights: {
          strengths: ["Death overs specialist", "Yorker master", "Reverses swing"],
          weaknesses: ["Expensive in powerplay occasionally", "Injury concerns"],
          roleTag: "Death Bowler",
        },
        matchups: [
          { team: "CSK", wickets: 18, average: 22.1 },
          { team: "RCB", wickets: 21, average: 19.8 },
          { team: "KKR", wickets: 14, average: 25.3 },
        ],
        homeAvg: 21.0,
        awayAvg: 26.1,
        impact: { dotBallPercent: 44.2 },
        fantasy: { fantasyRating: 9.4, consistencyScore: 81 },
      },
      {
        id: "suryakumar-yadav",
        name: "Suryakumar Yadav",
        age: 34,
        role: "Batsman",
        team: "Mumbai Indians",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316645.jpg",
        rating: 4.7,
        injuryStatus: "Fit",
        playingProbability: 92,
        batting: { runs: 2644, average: 32.6, strikeRate: 142.9, highestScore: 103, fifties: 19, hundreds: 1, matches: 87 },
        bowling: null,
        recentForm: [
          { match: "vs CSK", score: 103, wickets: null },
          { match: "vs RCB", score: 34, wickets: null },
          { match: "vs KKR", score: 0, wickets: null },
          { match: "vs DC", score: 67, wickets: null },
          { match: "vs SRH", score: 45, wickets: null },
        ],
        highlights: {
          bestSeason: "2022 – 303 runs",
          careerHigh: "103 vs CSK",
          awards: ["Best Striker 2022"],
        },
        insights: {
          strengths: ["360-degree hitter", "Scoops & ramps", "Unorthodox shot selection"],
          weaknesses: ["Can be reckless in powerplay", "Struggles against raw pace"],
          roleTag: "Finisher / Middle Order",
        },
        matchups: [
          { team: "CSK", runs: 344, average: 38.2 },
          { team: "RCB", runs: 289, average: 32.1 },
          { team: "KKR", runs: 211, average: 26.4 },
        ],
        homeAvg: 36.2,
        awayAvg: 29.4,
        impact: { deathOversStrikeRate: 168.3, boundaryPercent: 61.2 },
        fantasy: { fantasyRating: 8.7, consistencyScore: 72 },
      },
      {
        id: "hardik-pandya",
        name: "Hardik Pandya",
        age: 31,
        role: "All-rounder",
        team: "Mumbai Indians",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast-medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316636.jpg",
        rating: 4.5,
        injuryStatus: "Doubtful",
        playingProbability: 65,
        batting: { runs: 2178, average: 29.8, strikeRate: 145.6, highestScore: 91, fifties: 10, hundreds: 0, matches: 107 },
        bowling: { wickets: 74, economy: 8.9, bestFigures: "3/20", average: 29.4, matches: 107 },
        recentForm: [
          { match: "vs CSK", score: 42, wickets: 1 },
          { match: "vs RCB", score: 8, wickets: 2 },
          { match: "vs KKR", score: 91, wickets: 0 },
          { match: "vs DC", score: 15, wickets: 3 },
          { match: "vs SRH", score: 0, wickets: 1 },
        ],
        highlights: {
          bestSeason: "2021 – 304 runs, 16 wickets",
          careerHigh: "91 vs KKR",
          awards: ["Best All-rounder 2021"],
        },
        insights: {
          strengths: ["Hard hitter", "Useful medium pacer", "Powerplay impact"],
          weaknesses: ["Injury prone", "Inconsistent with the ball"],
          roleTag: "Impact All-rounder",
        },
        matchups: [
          { team: "CSK", runs: 298, average: 27.1 },
          { team: "RCB", runs: 312, average: 31.2 },
          { team: "KKR", runs: 267, average: 24.3 },
        ],
        homeAvg: 33.1,
        awayAvg: 27.2,
        impact: { deathOversStrikeRate: 162.4, dotBallPercent: 38.1, boundaryPercent: 58.4 },
        fantasy: { fantasyRating: 8.3, consistencyScore: 68 },
      },
      {
        id: "ishan-kishan",
        name: "Ishan Kishan",
        age: 26,
        role: "Wicket-keeper",
        team: "Mumbai Indians",
        battingStyle: "Left-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338720.jpg",
        rating: 4.2,
        injuryStatus: "Fit",
        playingProbability: 90,
        batting: { runs: 1989, average: 28.4, strikeRate: 135.8, highestScore: 99, fifties: 14, hundreds: 0, matches: 78 },
        bowling: null,
        recentForm: [
          { match: "vs CSK", score: 47, wickets: null },
          { match: "vs RCB", score: 99, wickets: null },
          { match: "vs KKR", score: 8, wickets: null },
          { match: "vs DC", score: 23, wickets: null },
          { match: "vs SRH", score: 65, wickets: null },
        ],
        highlights: {
          bestSeason: "2022 – 418 runs",
          careerHigh: "99 vs RCB",
          awards: ["Fastest 50 (18 balls) 2022"],
        },
        insights: {
          strengths: ["Explosive opener", "Strong on-side game", "Quick stumping"],
          weaknesses: ["Inconsistent form", "Struggles vs short-pitched bowling"],
          roleTag: "Explosive Opener",
        },
        matchups: [
          { team: "CSK", runs: 278, average: 27.8 },
          { team: "RCB", runs: 302, average: 37.8 },
          { team: "KKR", runs: 198, average: 22.0 },
        ],
        homeAvg: 30.2,
        awayAvg: 26.8,
        impact: { deathOversStrikeRate: 155.0, boundaryPercent: 55.8 },
        fantasy: { fantasyRating: 7.8, consistencyScore: 64 },
      },
    ],
  },
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg",
    primaryColor: "#F9CD1B",
    secondaryColor: "#0081E9",
    city: "Chennai",
    players: [
      {
        id: "ms-dhoni",
        name: "MS Dhoni",
        age: 43,
        role: "Wicket-keeper",
        team: "Chennai Super Kings",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316616.jpg",
        rating: 5.0,
        injuryStatus: "Fit",
        playingProbability: 90,
        batting: { runs: 5082, average: 38.9, strikeRate: 135.9, highestScore: 84, fifties: 24, hundreds: 0, matches: 234 },
        bowling: null,
        recentForm: [
          { match: "vs MI", score: 32, wickets: null },
          { match: "vs RCB", score: 0, wickets: null },
          { match: "vs KKR", score: 28, wickets: null },
          { match: "vs DC", score: 55, wickets: null },
          { match: "vs SRH", score: 19, wickets: null },
        ],
        highlights: {
          bestSeason: "2010 – 287 runs",
          careerHigh: "84 vs RR",
          awards: ["5x IPL Winner", "Best Captain Award"],
        },
        insights: {
          strengths: ["Finishing ability", "Ice-cool under pressure", "Helicopter shot"],
          weaknesses: ["Age factor", "Slow against swing"],
          roleTag: "Finisher / Captain",
        },
        matchups: [
          { team: "MI", runs: 478, average: 35.4 },
          { team: "RCB", runs: 501, average: 38.5 },
          { team: "KKR", runs: 415, average: 32.7 },
        ],
        homeAvg: 42.1,
        awayAvg: 35.2,
        impact: { deathOversStrikeRate: 144.8, boundaryPercent: 48.1 },
        fantasy: { fantasyRating: 9.2, consistencyScore: 82 },
      },
      {
        id: "ruturaj-gaikwad",
        name: "Ruturaj Gaikwad",
        age: 27,
        role: "Batsman",
        team: "Chennai Super Kings",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm off-break",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338747.jpg",
        rating: 4.4,
        injuryStatus: "Fit",
        playingProbability: 95,
        batting: { runs: 2219, average: 41.1, strikeRate: 136.8, highestScore: 101, fifties: 18, hundreds: 2, matches: 58 },
        bowling: null,
        recentForm: [
          { match: "vs MI", score: 49, wickets: null },
          { match: "vs RCB", score: 101, wickets: null },
          { match: "vs KKR", score: 17, wickets: null },
          { match: "vs DC", score: 73, wickets: null },
          { match: "vs SRH", score: 88, wickets: null },
        ],
        highlights: {
          bestSeason: "2021 – 635 runs (Orange Cap)",
          careerHigh: "101 vs RCB",
          awards: ["Orange Cap 2021"],
        },
        insights: {
          strengths: ["Consistent opener", "Strong off-side game", "Handles spin well"],
          weaknesses: ["Struggles in night dew conditions", "Can be tentative vs short ball"],
          roleTag: "Anchor / Opener",
        },
        matchups: [
          { team: "MI", runs: 318, average: 39.8 },
          { team: "RCB", runs: 412, average: 51.5 },
          { team: "KKR", runs: 267, average: 33.4 },
        ],
        homeAvg: 45.2,
        awayAvg: 37.0,
        impact: { deathOversStrikeRate: 138.2, boundaryPercent: 49.3 },
        fantasy: { fantasyRating: 8.6, consistencyScore: 76 },
      },
      {
        id: "ravindra-jadeja",
        name: "Ravindra Jadeja",
        age: 36,
        role: "All-rounder",
        team: "Chennai Super Kings",
        battingStyle: "Left-hand bat",
        bowlingStyle: "Slow left-arm orthodox",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316625.jpg",
        rating: 4.6,
        injuryStatus: "Fit",
        playingProbability: 93,
        batting: { runs: 2692, average: 28.3, strikeRate: 132.5, highestScore: 62, fifties: 2, hundreds: 0, matches: 198 },
        bowling: { wickets: 132, economy: 7.62, bestFigures: "5/16", average: 28.4, matches: 198 },
        recentForm: [
          { match: "vs MI", score: 34, wickets: 2 },
          { match: "vs RCB", score: 21, wickets: 1 },
          { match: "vs KKR", score: 55, wickets: 3 },
          { match: "vs DC", score: 8, wickets: 0 },
          { match: "vs SRH", score: 41, wickets: 2 },
        ],
        highlights: {
          bestSeason: "2019 – 227 runs, 15 wickets",
          careerHigh: "5/16 vs MI",
          awards: ["Best Fielder 2019", "Golden Glove Award"],
        },
        insights: {
          strengths: ["Restrictive spinner", "Explosive lower-order batting", "Elite fielder"],
          weaknesses: ["Can be expensive on flat tracks", "Inconsistent with the bat"],
          roleTag: "Impact All-rounder",
        },
        matchups: [
          { team: "MI", wickets: 22, average: 24.5, runs: 318 },
          { team: "RCB", wickets: 18, average: 26.2, runs: 278 },
          { team: "KKR", wickets: 15, average: 27.8, runs: 211 },
        ],
        homeAvg: 29.8,
        awayAvg: 26.4,
        impact: { deathOversStrikeRate: 148.7, dotBallPercent: 41.3, boundaryPercent: 47.1 },
        fantasy: { fantasyRating: 9.0, consistencyScore: 79 },
      },
      {
        id: "deepak-chahar",
        name: "Deepak Chahar",
        age: 31,
        role: "Bowler",
        team: "Chennai Super Kings",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium-fast",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338728.jpg",
        rating: 4.1,
        injuryStatus: "Doubtful",
        playingProbability: 60,
        batting: { runs: 134, average: 13.4, strikeRate: 95.0, highestScore: 28, fifties: 0, hundreds: 0, matches: 72 },
        bowling: { wickets: 68, economy: 7.93, bestFigures: "4/13", average: 24.7, matches: 72 },
        recentForm: [
          { match: "vs MI", score: null, wickets: 2 },
          { match: "vs RCB", score: null, wickets: 0 },
          { match: "vs KKR", score: null, wickets: 3 },
          { match: "vs DC", score: null, wickets: 1 },
          { match: "vs SRH", score: null, wickets: 4 },
        ],
        highlights: {
          bestSeason: "2021 – 14 wickets",
          careerHigh: "4/13 vs MI",
          awards: [],
        },
        insights: {
          strengths: ["Powerplay specialist", "Swing bowling", "Natural movement off seam"],
          weaknesses: ["Expensive in death overs", "Injury history"],
          roleTag: "Powerplay Bowler",
        },
        matchups: [
          { team: "MI", wickets: 12, average: 26.1 },
          { team: "RCB", wickets: 9, average: 28.8 },
          { team: "KKR", wickets: 11, average: 22.9 },
        ],
        homeAvg: 23.4,
        awayAvg: 26.2,
        impact: { dotBallPercent: 38.8 },
        fantasy: { fantasyRating: 7.4, consistencyScore: 61 },
      },
      {
        id: "shivam-dube",
        name: "Shivam Dube",
        age: 31,
        role: "All-rounder",
        team: "Chennai Super Kings",
        battingStyle: "Left-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338744.jpg",
        rating: 4.0,
        injuryStatus: "Fit",
        playingProbability: 88,
        batting: { runs: 1234, average: 32.5, strikeRate: 154.2, highestScore: 95, fifties: 8, hundreds: 0, matches: 54 },
        bowling: { wickets: 14, economy: 10.2, bestFigures: "2/28", average: 42.1, matches: 54 },
        recentForm: [
          { match: "vs MI", score: 66, wickets: 0 },
          { match: "vs RCB", score: 95, wickets: 1 },
          { match: "vs KKR", score: 12, wickets: 0 },
          { match: "vs DC", score: 44, wickets: 1 },
          { match: "vs SRH", score: 7, wickets: 0 },
        ],
        highlights: {
          bestSeason: "2024 – 545 runs",
          careerHigh: "95 vs RCB",
          awards: [],
        },
        insights: {
          strengths: ["Hard hitter", "Sixes specialist", "Handles pace well"],
          weaknesses: ["Vulnerable to spin", "Token bowling"],
          roleTag: "Finisher",
        },
        matchups: [
          { team: "MI", runs: 198, average: 33.0 },
          { team: "RCB", runs: 312, average: 44.6 },
          { team: "KKR", runs: 178, average: 25.4 },
        ],
        homeAvg: 35.2,
        awayAvg: 30.1,
        impact: { deathOversStrikeRate: 172.4, boundaryPercent: 65.3 },
        fantasy: { fantasyRating: 7.9, consistencyScore: 67 },
      },
    ],
  },
  {
    id: "rcb",
    name: "Royal Challengers Bengaluru",
    shortName: "RCB",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Royal_Challengers_Bangalore_2020.svg",
    primaryColor: "#EC1C24",
    secondaryColor: "#2B2B2B",
    city: "Bengaluru",
    players: [
      {
        id: "virat-kohli",
        name: "Virat Kohli",
        age: 36,
        role: "Batsman",
        team: "Royal Challengers Bengaluru",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316631.jpg",
        rating: 5.0,
        injuryStatus: "Fit",
        playingProbability: 99,
        batting: { runs: 8004, average: 37.25, strikeRate: 130.7, highestScore: 113, fifties: 55, hundreds: 8, matches: 243 },
        bowling: null,
        recentForm: [
          { match: "vs MI", score: 113, wickets: null },
          { match: "vs CSK", score: 72, wickets: null },
          { match: "vs KKR", score: 14, wickets: null },
          { match: "vs DC", score: 88, wickets: null },
          { match: "vs SRH", score: 45, wickets: null },
        ],
        highlights: {
          bestSeason: "2016 – 973 runs (All-time record)",
          careerHigh: "113 vs MI",
          awards: ["Orange Cap 2016", "8x IPL hundreds"],
        },
        insights: {
          strengths: ["Elite consistency", "Best against pace", "Partnership builder"],
          weaknesses: ["Struggles vs slow left-arm", "Can be passive in middle overs"],
          roleTag: "Anchor / Opener",
        },
        matchups: [
          { team: "MI", runs: 912, average: 42.5 },
          { team: "CSK", runs: 798, average: 38.4 },
          { team: "KKR", runs: 720, average: 36.0 },
        ],
        homeAvg: 44.2,
        awayAvg: 31.8,
        impact: { deathOversStrikeRate: 132.1, boundaryPercent: 48.7 },
        fantasy: { fantasyRating: 9.6, consistencyScore: 86 },
      },
      {
        id: "faf-du-plessis",
        name: "Faf du Plessis",
        age: 40,
        role: "Batsman",
        team: "Royal Challengers Bengaluru",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316621.jpg",
        rating: 4.5,
        injuryStatus: "Fit",
        playingProbability: 88,
        batting: { runs: 2273, average: 41.3, strikeRate: 143.2, highestScore: 96, fifties: 19, hundreds: 0, matches: 61 },
        bowling: null,
        recentForm: [
          { match: "vs MI", score: 65, wickets: null },
          { match: "vs CSK", score: 8, wickets: null },
          { match: "vs KKR", score: 96, wickets: null },
          { match: "vs DC", score: 43, wickets: null },
          { match: "vs SRH", score: 29, wickets: null },
        ],
        highlights: {
          bestSeason: "2022 – 730 runs (Orange Cap)",
          careerHigh: "96 vs KKR",
          awards: ["Orange Cap 2022"],
        },
        insights: {
          strengths: ["Elegant stroke player", "Covers well in powerplay", "Stable against spin"],
          weaknesses: ["Age-related dip in form", "Can be tentative early"],
          roleTag: "Anchor / Captain",
        },
        matchups: [
          { team: "MI", runs: 378, average: 42.0 },
          { team: "CSK", runs: 312, average: 39.0 },
          { team: "KKR", runs: 412, average: 51.5 },
        ],
        homeAvg: 44.8,
        awayAvg: 38.2,
        impact: { deathOversStrikeRate: 141.5, boundaryPercent: 51.6 },
        fantasy: { fantasyRating: 8.5, consistencyScore: 74 },
      },
      {
        id: "glenn-maxwell",
        name: "Glenn Maxwell",
        age: 36,
        role: "All-rounder",
        team: "Royal Challengers Bengaluru",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm off-break",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316634.jpg",
        rating: 4.3,
        injuryStatus: "Fit",
        playingProbability: 90,
        batting: { runs: 2376, average: 26.4, strikeRate: 154.8, highestScore: 95, fifties: 12, hundreds: 0, matches: 110 },
        bowling: { wickets: 32, economy: 8.6, bestFigures: "3/16", average: 35.4, matches: 110 },
        recentForm: [
          { match: "vs MI", score: 54, wickets: 1 },
          { match: "vs CSK", score: 7, wickets: 0 },
          { match: "vs KKR", score: 78, wickets: 2 },
          { match: "vs DC", score: 15, wickets: 1 },
          { match: "vs SRH", score: 95, wickets: 0 },
        ],
        highlights: {
          bestSeason: "2014 – 552 runs",
          careerHigh: "95 vs SRH",
          awards: ["Best Overseas Batter 2014"],
        },
        insights: {
          strengths: ["Big-match temperament", "360 hitter", "Useful off-spin"],
          weaknesses: ["Can go through long slumps", "Vulnerable to seam in form lapses"],
          roleTag: "Impact All-rounder",
        },
        matchups: [
          { team: "MI", runs: 342, average: 28.5 },
          { team: "CSK", runs: 298, average: 24.8 },
          { team: "KKR", runs: 389, average: 35.4 },
        ],
        homeAvg: 29.4,
        awayAvg: 23.8,
        impact: { deathOversStrikeRate: 178.3, dotBallPercent: 35.4, boundaryPercent: 63.7 },
        fantasy: { fantasyRating: 8.1, consistencyScore: 62 },
      },
      {
        id: "mohammed-siraj",
        name: "Mohammed Siraj",
        age: 30,
        role: "Bowler",
        team: "Royal Challengers Bengaluru",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast-medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338740.jpg",
        rating: 4.2,
        injuryStatus: "Fit",
        playingProbability: 94,
        batting: { runs: 48, average: 6.0, strikeRate: 80.0, highestScore: 14, fifties: 0, hundreds: 0, matches: 95 },
        bowling: { wickets: 90, economy: 8.41, bestFigures: "4/32", average: 27.4, matches: 95 },
        recentForm: [
          { match: "vs MI", score: null, wickets: 3 },
          { match: "vs CSK", score: null, wickets: 1 },
          { match: "vs KKR", score: null, wickets: 2 },
          { match: "vs DC", score: null, wickets: 0 },
          { match: "vs SRH", score: null, wickets: 4 },
        ],
        highlights: {
          bestSeason: "2022 – 17 wickets",
          careerHigh: "4/32 vs SRH",
          awards: [],
        },
        insights: {
          strengths: ["Swing at top", "Good length discipline", "Improving death overs"],
          weaknesses: ["Expensive in middle overs", "Struggles in flat pitch conditions"],
          roleTag: "New Ball Bowler",
        },
        matchups: [
          { team: "MI", wickets: 15, average: 26.3 },
          { team: "CSK", wickets: 12, average: 28.9 },
          { team: "KKR", wickets: 14, average: 25.1 },
        ],
        homeAvg: 25.1,
        awayAvg: 29.8,
        impact: { dotBallPercent: 40.1 },
        fantasy: { fantasyRating: 7.6, consistencyScore: 63 },
      },
      {
        id: "dinesh-karthik",
        name: "Dinesh Karthik",
        age: 39,
        role: "Wicket-keeper",
        team: "Royal Challengers Bengaluru",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316613.jpg",
        rating: 4.1,
        injuryStatus: "Fit",
        playingProbability: 85,
        batting: { runs: 4670, average: 25.9, strikeRate: 134.2, highestScore: 83, fifties: 22, hundreds: 0, matches: 229 },
        bowling: null,
        recentForm: [
          { match: "vs MI", score: 28, wickets: null },
          { match: "vs CSK", score: 14, wickets: null },
          { match: "vs KKR", score: 44, wickets: null },
          { match: "vs DC", score: 83, wickets: null },
          { match: "vs SRH", score: 6, wickets: null },
        ],
        highlights: {
          bestSeason: "2022 – 330 runs at SR 183.3",
          careerHigh: "83 vs DC",
          awards: ["Best Finisher Award 2022"],
        },
        insights: {
          strengths: ["Death overs legend", "Helicopter & switch hit", "Calm under pressure"],
          weaknesses: ["Age concerns", "Inconsistent in middle overs"],
          roleTag: "Finisher",
        },
        matchups: [
          { team: "MI", runs: 512, average: 28.4 },
          { team: "CSK", runs: 434, average: 24.1 },
          { team: "KKR", runs: 389, average: 21.6 },
        ],
        homeAvg: 28.4,
        awayAvg: 23.2,
        impact: { deathOversStrikeRate: 182.6, boundaryPercent: 62.4 },
        fantasy: { fantasyRating: 7.8, consistencyScore: 66 },
      },
    ],
  },
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo_%28New%29.svg",
    primaryColor: "#3A225D",
    secondaryColor: "#F0BC42",
    city: "Kolkata",
    players: [
      {
        id: "andre-russell",
        name: "Andre Russell",
        age: 36,
        role: "All-rounder",
        team: "Kolkata Knight Riders",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast-medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316643.jpg",
        rating: 4.9,
        injuryStatus: "Fit",
        playingProbability: 97,
        batting: { runs: 2838, average: 29.6, strikeRate: 179.5, highestScore: 88, fifties: 10, hundreds: 0, matches: 119 },
        bowling: { wickets: 87, economy: 9.12, bestFigures: "4/20", average: 26.2, matches: 119 },
        recentForm: [
          { match: "vs MI", score: 88, wickets: 2 },
          { match: "vs CSK", score: 45, wickets: 3 },
          { match: "vs RCB", score: 12, wickets: 1 },
          { match: "vs DC", score: 71, wickets: 2 },
          { match: "vs SRH", score: 5, wickets: 4 },
        ],
        highlights: {
          bestSeason: "2019 – 510 runs, 11 wickets",
          careerHigh: "88* vs SRH",
          awards: ["Most Valuable Player 2019"],
        },
        insights: {
          strengths: ["Monster hitter", "Reliable seamer", "Chase specialist"],
          weaknesses: ["Exposed by good-length deliveries early", "Occasional disciplinary issues"],
          roleTag: "Impact All-rounder",
        },
        matchups: [
          { team: "MI", runs: 412, average: 31.7, wickets: 15 },
          { team: "CSK", runs: 378, average: 28.3, wickets: 12 },
          { team: "RCB", runs: 389, average: 35.4, wickets: 14 },
        ],
        homeAvg: 33.2,
        awayAvg: 26.4,
        impact: { deathOversStrikeRate: 196.4, dotBallPercent: 36.2, boundaryPercent: 71.4 },
        fantasy: { fantasyRating: 9.5, consistencyScore: 75 },
      },
      {
        id: "shreyas-iyer",
        name: "Shreyas Iyer",
        age: 30,
        role: "Batsman",
        team: "Kolkata Knight Riders",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338733.jpg",
        rating: 4.4,
        injuryStatus: "Fit",
        playingProbability: 94,
        batting: { runs: 3237, average: 31.9, strikeRate: 125.8, highestScore: 96, fifties: 22, hundreds: 0, matches: 113 },
        bowling: null,
        recentForm: [
          { match: "vs MI", score: 47, wickets: null },
          { match: "vs CSK", score: 76, wickets: null },
          { match: "vs RCB", score: 18, wickets: null },
          { match: "vs DC", score: 96, wickets: null },
          { match: "vs SRH", score: 32, wickets: null },
        ],
        highlights: {
          bestSeason: "2022 – 401 runs",
          careerHigh: "96 vs DC",
          awards: ["Best Captain DC 2020"],
        },
        insights: {
          strengths: ["Middle-order anchor", "Strong vs pace", "Leadership quality"],
          weaknesses: ["Bouncer susceptibility", "Slow scoring rate in middle overs"],
          roleTag: "Anchor / Captain",
        },
        matchups: [
          { team: "MI", runs: 378, average: 30.1 },
          { team: "CSK", runs: 412, average: 37.5 },
          { team: "RCB", runs: 312, average: 28.4 },
        ],
        homeAvg: 34.5,
        awayAvg: 29.6,
        impact: { deathOversStrikeRate: 128.4, boundaryPercent: 44.2 },
        fantasy: { fantasyRating: 8.2, consistencyScore: 72 },
      },
      {
        id: "sunil-narine",
        name: "Sunil Narine",
        age: 36,
        role: "All-rounder",
        team: "Kolkata Knight Riders",
        battingStyle: "Left-hand bat",
        bowlingStyle: "Right-arm off-spin",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316647.jpg",
        rating: 4.7,
        injuryStatus: "Fit",
        playingProbability: 95,
        batting: { runs: 1883, average: 22.7, strikeRate: 167.1, highestScore: 85, fifties: 8, hundreds: 0, matches: 162 },
        bowling: { wickets: 155, economy: 6.67, bestFigures: "5/19", average: 22.8, matches: 162 },
        recentForm: [
          { match: "vs MI", score: 67, wickets: 2 },
          { match: "vs CSK", score: 85, wickets: 1 },
          { match: "vs RCB", score: 38, wickets: 3 },
          { match: "vs DC", score: 12, wickets: 0 },
          { match: "vs SRH", score: 54, wickets: 2 },
        ],
        highlights: {
          bestSeason: "2012 – 24 wickets",
          careerHigh: "5/19 vs MI",
          awards: ["Purple Cap 2012", "Most Economical Bowler"],
        },
        insights: {
          strengths: ["Mystery spinner", "Explosive opener", "World-class economy"],
          weaknesses: ["Inconsistent batting form", "Not effective on flat decks"],
          roleTag: "Impact All-rounder / Opener",
        },
        matchups: [
          { team: "MI", wickets: 25, average: 21.2, runs: 342 },
          { team: "CSK", wickets: 22, average: 23.4, runs: 298 },
          { team: "RCB", wickets: 18, average: 25.6, runs: 254 },
        ],
        homeAvg: 24.2,
        awayAvg: 21.3,
        impact: { deathOversStrikeRate: 180.5, dotBallPercent: 45.8, boundaryPercent: 62.3 },
        fantasy: { fantasyRating: 9.3, consistencyScore: 77 },
      },
      {
        id: "varun-chakravarthy",
        name: "Varun Chakravarthy",
        age: 33,
        role: "Bowler",
        team: "Kolkata Knight Riders",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm mystery spin",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338746.jpg",
        rating: 4.3,
        injuryStatus: "Fit",
        playingProbability: 91,
        batting: { runs: 22, average: 5.5, strikeRate: 68.8, highestScore: 8, fifties: 0, hundreds: 0, matches: 62 },
        bowling: { wickets: 75, economy: 7.88, bestFigures: "5/20", average: 25.2, matches: 62 },
        recentForm: [
          { match: "vs MI", score: null, wickets: 2 },
          { match: "vs CSK", score: null, wickets: 3 },
          { match: "vs RCB", score: null, wickets: 1 },
          { match: "vs DC", score: null, wickets: 4 },
          { match: "vs SRH", score: null, wickets: 2 },
        ],
        highlights: {
          bestSeason: "2021 – 18 wickets",
          careerHigh: "5/20 vs MI",
          awards: ["Best New Bowler 2020"],
        },
        insights: {
          strengths: ["Mystery variation", "Effective in powerplay & middle overs", "Unique carrom ball"],
          weaknesses: ["Can be read by experienced batters over time", "Injury risk"],
          roleTag: "Mystery Spinner",
        },
        matchups: [
          { team: "MI", wickets: 14, average: 24.4 },
          { team: "CSK", wickets: 16, average: 22.1 },
          { team: "RCB", wickets: 12, average: 27.3 },
        ],
        homeAvg: 23.2,
        awayAvg: 27.4,
        impact: { dotBallPercent: 42.6 },
        fantasy: { fantasyRating: 8.0, consistencyScore: 69 },
      },
      {
        id: "venkatesh-iyer",
        name: "Venkatesh Iyer",
        age: 30,
        role: "All-rounder",
        team: "Kolkata Knight Riders",
        battingStyle: "Left-hand bat",
        bowlingStyle: "Right-arm medium",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/338700/338742.jpg",
        rating: 4.1,
        injuryStatus: "Fit",
        playingProbability: 87,
        batting: { runs: 1298, average: 30.2, strikeRate: 141.8, highestScore: 104, fifties: 9, hundreds: 1, matches: 55 },
        bowling: { wickets: 18, economy: 9.8, bestFigures: "3/31", average: 38.2, matches: 55 },
        recentForm: [
          { match: "vs MI", score: 58, wickets: 1 },
          { match: "vs CSK", score: 21, wickets: 0 },
          { match: "vs RCB", score: 104, wickets: 0 },
          { match: "vs DC", score: 34, wickets: 2 },
          { match: "vs SRH", score: 7, wickets: 0 },
        ],
        highlights: {
          bestSeason: "2021 – 370 runs in 10 matches",
          careerHigh: "104 vs RCB",
          awards: ["Emerging Player 2021"],
        },
        insights: {
          strengths: ["Explosive opener", "Strong straight-bat drives", "Good powerplay player"],
          weaknesses: ["Inconsistent bowling", "Can struggle vs quality spin"],
          roleTag: "Explosive All-rounder",
        },
        matchups: [
          { team: "MI", runs: 218, average: 31.1 },
          { team: "CSK", runs: 198, average: 28.3 },
          { team: "RCB", runs: 278, average: 39.7 },
        ],
        homeAvg: 33.8,
        awayAvg: 27.1,
        impact: { deathOversStrikeRate: 155.6, dotBallPercent: 40.2, boundaryPercent: 54.3 },
        fantasy: { fantasyRating: 7.7, consistencyScore: 65 },
      },
    ],
  },
];

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getPlayerById(playerId: string): { player: Player; team: Team } | undefined {
  for (const team of teams) {
    const player = team.players.find((p) => p.id === playerId);
    if (player) return { player, team };
  }
  return undefined;
}

export function getAllPlayers(): { player: Player; team: Team }[] {
  return teams.flatMap((team) => team.players.map((player) => ({ player, team })));
}
