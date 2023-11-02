import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar'; // Importe o componente SearchBar

interface HeroData {
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

const CardHeroes: React.FC = () => {
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get('http://homologacao3.azapfy.com.br/api/ps/metahumans');
        const data: HeroData[] = response.data;

        setHeroes(data);
      } catch (error) {
        console.error('Erro ao buscar heróis:', error);
      }
    };

    fetchHeroes();
  }, []);

  const filteredHeroes = heroes.filter((hero) => {
    return hero.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="card-heroes">
      <SearchBar onSearch={setSearchText} /> {/* Passe setSearchText como onSearch para o SearchBar */}
      {filteredHeroes.map((hero) => (
        <div key={hero.id} className="hero-card">
          <h2>{hero.name}</h2>
          <p>Race: {hero.appearance.race}</p>
        </div>
      ))}
    </div>
  );
};

export default CardHeroes;
