import React, { useState } from "react";
import {
  Button,
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
import { dataHeroes } from "../data/dataHeroes";

import useStyles from "./CardHeroesStyles";

interface ButtonModalProps {
  hero?: HeroData;
}

const CardHeroes: React.FC<ButtonModalProps> = React.memo(({ hero }) => {
  const classes = useStyles();
  const [selectedHeroes, setSelectedHeroes] = useState<HeroData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [hoveredCard, setHoveredCard] = useState<HeroData | null>(null);

  const handleMouseEnter = (selectedHero: HeroData) => {
    setHoveredCard(selectedHero);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

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

  const filteredHeroes = dataHeroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container className={classes.containerPrincipal}>
      <div className={classes.headerCard}>
        <SearchBar onSearch={setSearchText} />
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
                          strength: <b>{hero.powerstats.strength}</b>
                        </p>
                        <p>
                          speed: <b>{hero.powerstats.speed}</b>
                        </p>
                        <p>
                          durability: <b>{hero.powerstats.durability}</b>
                        </p>
                        <p>
                          power: <b>{hero.powerstats.power}</b>
                        </p>
                        <p>
                          combat: <b>{hero.powerstats.combat}</b>
                        </p>
                      </div>
                    </div>
                    <h2 className={classes.heroName}>
                      {hero.name.toUpperCase()}
                    </h2>
                    <div className={classes.totalPower}>
                      <GiBroadsword className={classes.sword} />
                      <p>{calculateTotalPower(hero)}</p>
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
