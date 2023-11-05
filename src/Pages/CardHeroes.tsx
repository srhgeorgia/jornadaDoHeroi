import React, { useState, useEffect } from "react";
import axios from "axios";
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
import ButtonModal from "../Components/ButtonModal";
import { GiBroadsword } from "react-icons/gi";
import SearchBar from "../Components/SearchBar";
import { HeroData } from "../types";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const useStyles = makeStyles({
  cardContainer: {
    margin: "1rem",
    width: "14rem",
    backgroundColor: getRandomColor(),
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0",
    position: "relative",
  },
  imgCard: {
    cursor: "pointer",
    boxShadow: "0 0 100px greenyellow",
  },
  imgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "none",
  },
  overlayInfo: {
    position: "absolute",
    top: "8%",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    fontSize: "1rem",
    textAlign: "center",
  },
  totalPower: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  sword: {
    fontSize: "20px",
    marginRight: "5px",
  },
  buttonImg: {
    padding: "0",
  },
  cardAction: {
    backgroundColor: "#ccc",
  },
  buttonBackground: {
    backgroundColor: "#363582",
    color: "#fff",
    margin: "1rem",
    "&:hover": {
      background: "#fff",
      color: "#363582",
    },
  },
  headerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

interface ButtonModalProps {
  hero?: HeroData;
}

const CardHeroes: React.FC<ButtonModalProps> = React.memo(({ hero }) => {
  const classes = useStyles();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedHeroes, setSelectedHeroes] = useState<HeroData[]>([]);
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedHeroForDetails, setSelectedHeroForDetails] =
    useState<HeroData | null>(null);
  const [hoveredCard, setHoveredCard] = useState<HeroData | null>(null);

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
  };

  const handleMouseEnter = (selectedHero: HeroData) => {
    setHoveredCard(selectedHero);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const filteredHeroes = heroes.filter((hero) => {
    return hero.name.toLowerCase().includes(searchText.toLowerCase());
  });

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          "http://homologacao3.azapfy.com.br/api/ps/metahumans",
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
      <div className={classes.headerCard}>
        <Button className={classes.buttonBackground} onClick={reloadPage}>
          <p>Change cards background</p>
        </Button>
        <SearchBar onSearch={setSearchText} />{" "}
      </div>
      <Grid container spacing={1}>
        {filteredHeroes.map((hero, index) => (
          <div key={hero.id}>
            <Grid container item spacing={1}>
              <Card
                className={classes.cardContainer}
                onMouseEnter={() => handleMouseEnter(hero)}
                onMouseLeave={handleMouseLeave}
              >
                <CardContent className={classes.cardContent}>
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
                      <p>Raça: {hero.appearance.race}</p>
                      <p>Intelligence: {hero.powerstats.intelligence}</p>
                      <p>Strength: {hero.powerstats.strength}</p>
                      <p>Speed: {hero.powerstats.speed}</p>
                      <p>Durability: {hero.powerstats.durability}</p>
                      <p>Power: {hero.powerstats.power}</p>
                      <p>Combat: {hero.powerstats.combat}</p>
                    </div>
                  </div>
                  <h2>{hero.name.toUpperCase()}</h2>
                  <div className={classes.totalPower}>
                    <GiBroadsword className={classes.sword} />
                    <p>{calculateTotalPower[index]}</p>
                  </div>
                </CardContent>
                <CardActions className={classes.cardAction}>
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
      <Dialog open={showDetailsModal} onClose={handleCloseDetails}>
        {selectedHeroForDetails && (
          <div>
            <DialogContent>
              <img
                src={selectedHeroForDetails.images.sm}
                alt={selectedHeroForDetails.name}
              />
              <div>
                <h3>{selectedHeroForDetails.name.toUpperCase()}</h3>
                <p>Raça: {selectedHeroForDetails.appearance.race}</p>
                <p>
                  Intelligence: {selectedHeroForDetails.powerstats.intelligence}
                </p>
                <p>Strength: {selectedHeroForDetails.powerstats.strength}</p>
                <p>Speed: {selectedHeroForDetails.powerstats.speed}</p>
                <p>
                  Durability: {selectedHeroForDetails.powerstats.durability}
                </p>
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
});

export default CardHeroes;
