export const mockTournament = {
  id: 1,
  title: "WEEKEND BATTLE",
  format: "7х7 - Групповой этап + плей-офф",
  cost: "Стоимость: 200 000 с команды",
  location: "Chilonzor Arena",
  participants: "10/12",
  time: "17:00",
  date: "25.12.25",
  price: "200.000 СУМ",
  distance: "4.9 км от вас",
  surface: "Искусственное покрытие",
  pitchType: "Открытая",
  dimensions: "20x40",
  workTime: "08:00 - 03:00",
  address: "Малая кольцевая дорога",
  team1: "CHELSEA FOOTBALL CLUB",
  team2: "MANCHESTER UNITED",
};

export const mockTournaments = [
  mockTournament,
  { ...mockTournament, id: 2 },
  { ...mockTournament, id: 3 },
];

export const mockStadiums = [
  {
    id: 1,
    name: "BUNYODKOR",
    location: "Малая кольцевая дорога",
    distance: "4.9 км от вас",
    rating: 9.9,
    price: 200000,
    image: "/assets/images/homepage/homepage.png",
  },
  {
    id: 2,
    name: "BUNYODKOR",
    location: "Малая кольцевая дорога",
    distance: "4.9 км от вас",
    rating: 9.9,
    price: 200000,
    image: "/assets/images/homepage/homepage.png",
  },
  {
    id: 3,
    name: "BUNYODKOR",
    location: "Малая кольцевая дорога",
    distance: "4.9 км от вас",
    rating: 9.9,
    price: 200000,
    image: "/assets/images/homepage/homepage.png",
  },
];
