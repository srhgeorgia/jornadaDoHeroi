export interface HeroData {
  id: number;
  name: string;
  appearance: {
    race: string;
  };
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
    [key: string]: number;
  };
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
  };
  work: {
    occupation: string;
  };
  images: {
    sm: string;
  };
}
