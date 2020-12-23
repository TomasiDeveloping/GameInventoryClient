export interface GameModel {
  gameId: number;
  name: string;
  publisherId: number;
  publisherName: string;
  gameEngineId: number;
  gameEngineName: string;
  firstPublication: Date;
  description: string;
  ageRating: number;
  information: string;
  coverUrl: string;
  mediums: Medium[];
  genres: Genre[];
  plattforms: Plattform[];
  gameModes: GameMode[];
}
interface Medium {
  mediumId: number;
  mediumName: string;
}

interface Genre {
  genreId: number;
  genreName: string;
}

interface Plattform {
  plattformId: number;
  plattformName: string;
}

interface GameMode {
  gameModeId: number;
  gameModeName: string;
}

export interface DisplayGame {
  gameId: number;
  gameName: string;
  publisherName: string;
  firstPublication: Date;
  coverUrl: string;
}

export interface GameParams {
  plattformId: number;
  genreId: number;
  gameModeId: number;
}
