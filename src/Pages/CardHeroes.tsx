import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
} from "@material-ui/core";
import ButtonModal from "../Components/ButtonModal";
import { GiBroadsword } from "react-icons/gi";
import SearchBar from "../Components/SearchBar";
import { HeroData } from "../types";
import useStyles from "./CardHeroesStyles";

interface ButtonModalProps {
  hero?: HeroData;
}

const CardHeroes: React.FC<ButtonModalProps> = React.memo(({ hero }) => {
  const classes = useStyles();
  const [selectedHeroes, setSelectedHeroes] = useState<HeroData[]>([]);
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [hoveredCard, setHoveredCard] = useState<HeroData | null>(null);

  const handleMouseEnter = (selectedHero: HeroData) => {
    setHoveredCard(selectedHero);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const filteredHeroes = heroes.filter((hero) => {
    return hero.name.toLowerCase().includes(searchText.toLowerCase());
  });

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          "http://homologacao3.azapfy.com.br/api/ps/metahumans"
        );
        const data: HeroData[] = response.data;

        const heroesWithTotalPower = data.map((hero) => ({
          ...hero,
          totalPower: calculateTotalPower(hero),
        }));

        setHeroes(heroesWithTotalPower);
      } catch (error) {
        console.error("Erro ao buscar heróis:", error);
      }
    };

    fetchHeroes();
  }, []);

  const calculateTotalPower = (hero: HeroData) => {
    return (
      hero.powerstats.intelligence +
      hero.powerstats.strength +
      hero.powerstats.speed +
      hero.powerstats.durability +
      hero.powerstats.power +
      hero.powerstats.combat
    );
  };

  return (
    <Container className={classes.containerPrincipal}>
      <div className={classes.headerCard}>
        <SearchBar onSearch={setSearchText} />{" "}
      </div>
      <Grid container spacing={1}>
        {filteredHeroes.map((hero) => (
          <div key={hero.id}>
            <Grid container item spacing={1}>
              <Card
                className={classes.cardContainer}
                onMouseEnter={() => handleMouseEnter(hero)}
                onMouseLeave={handleMouseLeave}
              >
                <CardContent className={classes.cardContent}>
                  <div className={classes.container}>
                    <img
                      className={classes.imgCard}
                      src={hero.images.sm}
                      alt={hero.name}
                    />
                    <div
                      className={classes.imgOverlay}
                      style={{
                        display:
                          hoveredCard && hoveredCard.id === hero.id
                            ? "block"
                            : "none",
                      }}
                    >
                      <div className={classes.overlayInfo}>
                        <p>
                          Race: <b>{hero.appearance.race}</b>
                        </p>
                        <p>
                          Intelligence: <b>{hero.powerstats.intelligence}</b>
                        </p>
                        <p>
                          Strength: <b>{hero.powerstats.strength}</b>
                        </p>
                        <p>
                          Speed: <b>{hero.powerstats.speed}</b>
                        </p>
                        <p>
                          Durability: <b>{hero.powerstats.durability}</b>
                        </p>
                        <p>
                          Power:<b> {hero.powerstats.power}</b>
                        </p>
                        <p>
                          Combat: <b>{hero.powerstats.combat}</b>
                        </p>
                      </div>
                    </div>
                    <h2 className={classes.heroName}>
                      {hero.name.toUpperCase()}
                    </h2>
                    <div className={classes.totalPower}>
                      <GiBroadsword className={classes.sword} />
                      <p>{hero.totalPower}</p>
                    </div>
                  </div>
                </CardContent>
                <CardActions className={classes.cardAction}>
                  <div className={classes.buttonsModal}>
                    <ButtonModal
                      key={hero.id}
                      hero={hero}
                      selectedHeroes={selectedHeroes}
                      setSelectedHeroes={setSelectedHeroes}
                    />
                  </div>
                </CardActions>
              </Card>
            </Grid>
          </div>
        ))}
      </Grid>
    </Container>
  );
});

export default CardHeroes;
