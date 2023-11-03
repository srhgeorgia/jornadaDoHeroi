import React, { useState, useEffect } from "react";
import { HeroData } from "../types";
import axios from "axios";
import SearchBar from "./SearchBar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ButtonModal from "./ButtonModal";

const useStyles = makeStyles({
  cardContainer: {
    margin: "1rem",
    width: "14rem",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0",
  },
  imgCard: {
    cursor: "pointer",
  },
});

interface ButtonModalProps {
  hero: HeroData;
}

const CardHeroes: React.FC<ButtonModalProps> = ({ hero }) => {
  const classes = useStyles();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedHeroes, setSelectedHeroes] = useState<HeroData[]>([]);
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedHeroForDetails, setSelectedHeroForDetails] =
    useState<HeroData | null>(null);

  const handleOpenDetails = (selectedHero: HeroData) => {
    setSelectedHeroForDetails(selectedHero);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
  };

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          "http://homologacao3.azapfy.com.br/api/ps/metahumans"
        );
        const data: HeroData[] = response.data;

        setHeroes(data);
      } catch (error) {
        console.error("Erro ao buscar heróis:", error);
      }
    };

    fetchHeroes();
  }, []);

  const calculateTotalPower = heroes.map((power) => {
    return (
      power.powerstats.intelligence +
      power.powerstats.strength +
      power.powerstats.speed +
      power.powerstats.durability +
      power.powerstats.power +
      power.powerstats.combat
    );
  });

  return (
    <Container>
      <SearchBar onSearch={setSearchText} />{" "}
      <Grid container spacing={1}>
        {heroes.map((hero, index) => (
          <div key={hero.id}>
            <Grid container item spacing={1}>
              <Card className={classes.cardContainer}>
                <CardContent className={classes.cardContent}>
                  <Button onClick={() => handleOpenDetails(hero)}>
                    <img
                      className={classes.imgCard}
                      src={hero.images.sm}
                      alt={hero.name}
                    />
                  </Button>
                  <h2>{hero.name}</h2>
                  <p>{calculateTotalPower[index]}</p>
                </CardContent>
                <CardActions>
                  <ButtonModal
                    key={hero.id}
                    hero={hero}
                    selectedHeroes={selectedHeroes}
                    setSelectedHeroes={setSelectedHeroes}
                  />
                </CardActions>
              </Card>
            </Grid>
          </div>
        ))}
      </Grid>

      <Dialog
        open={showDetailsModal}
        onClose={handleCloseDetails}
      >
        {selectedHeroForDetails && (
          <div>
            <DialogContent>
              <img src={selectedHeroForDetails.images.sm} alt={selectedHeroForDetails.name} />
              <div>
                <Typography variant="h6">{selectedHeroForDetails.name}</Typography>
                <p>Raça: {selectedHeroForDetails.appearance.race}</p>
                <p>Intelligence: {selectedHeroForDetails.powerstats.intelligence}</p>
                <p>Strength: {selectedHeroForDetails.powerstats.strength}</p>
                <p>Speed: {selectedHeroForDetails.powerstats.speed}</p>
                <p>Durability: {selectedHeroForDetails.powerstats.durability}</p>
                <p>Power: {selectedHeroForDetails.powerstats.power}</p>
                <p>Combat: {selectedHeroForDetails.powerstats.combat}</p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails} color="primary">
                Fechar
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </Container>
  );
};

export default CardHeroes;
