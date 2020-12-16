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
  mediums: [
    {
      mediumName: string;
      mediumId: number;
    }
  ];
  genres: [
    {
      genreName: string;
      genreId: number;
    }
    ];
  plattforms: [
    {
      plattformName: string;
      plattformId: number;
    }
  ];
  gameModes: [
    {
      gameModeName: string;
      gameModeId: number;
    }
  ];
}
