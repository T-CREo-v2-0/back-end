export interface Credibility {
  credibility: number;
}

export interface TextCredibilityWeights {
  weightSpam: number;
  weightBadWords: number;
  weightMisspelling: number;
  weightSemantic: number;
}

export interface TweetCredibilityWeights extends TextCredibilityWeights {
  weightText: number;
  weightSocial: number;
  weightUser: number;
  weightTopic: number;
}

export interface TwitterUser {
  verified: boolean;
  yearJoined: number;
  followersCount: number;
  friendsCount: number;
  statusesCount: number;
  favoritesCount: number;
  listedCount: number;
}

export interface Tweet {
  text: Text;
  user: TwitterUser;
  retweetCount: number;
  favoriteCount: number;
}

export interface Text {
  text: string;
  lang: Language;
}

export type Language = "es" | "en" | "fr";
