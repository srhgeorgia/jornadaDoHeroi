import React, { useState } from "react";
import {
  Button,
  Dialog,
  makeStyles,
  DialogContent,
  DialogActions,
  Container,
  Typography,
} from "@material-ui/core";
import { HeroData } from "../types";

interface ButtonModalProps {
  hero: HeroData;
  selectedHeroes: HeroData[];
  setSelectedHeroes: (heroes: HeroData[]) => void;
}

const useStyles = makeStyles({
  buttonModal: {
    fontSize: "10px",
    display: "block",
    boxSizing: "border-box",
    padding: "0.5rem",
    backgroundColor: "#363582",
    color: "#fff",
    margin: "0.5rem 1.5rem",
    "&:hover": {
      background: "#fff",
      color: "#363582",
    },
  },
  selectedButton: {
    backgroundColor: "#fff",
    color: "#363582",
  },
  buttonsModal: {
    display: "flex",
    justifyContent: "space-around",
  },
  cardModal: {
    display: "flex",
    alignItems: "center",
  },
  cardModalExternal: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
    },
  },
  heroInfo: {
    margin: "2rem 3rem",
    display: "flex",
    flexDirection: "row",
  },
  heroInfoP: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
  },

});

const ButtonModal: React.FC<ButtonModalProps> = ({
  hero,
  selectedHeroes,
  setSelectedHeroes,
}) => {
  const classes = useStyles();
  const [showSelectedHeroesModal, setShowSelectedHeroesModal] = useState(false);


  const handleOpenSelectedHeroes = () => {
    setShowSelectedHeroesModal(true);
  };

  const handleCloseSelectedHeroes = () => {
    setShowSelectedHeroesModal(false);
  };

  const handleChooseChampion = () => {
    const heroIndex = selectedHeroes.findIndex((h) => h === hero);

    if (heroIndex !== -1) {
      selectedHeroes.splice(heroIndex, 1);
    } else {
      if (selectedHeroes.length < 2) {
        selectedHeroes.push(hero);
      } else {
        selectedHeroes.shift();
        selectedHeroes.push(hero);
      }
    }

    setSelectedHeroes([...selectedHeroes]);

    if (selectedHeroes.length === 2) {
      setShowSelectedHeroesModal(true);
    }
  };

  return (
    <>
      <Container className={classes.buttonsModal}>
        <Button
          className={`${classes.buttonModal} ${
            selectedHeroes.includes(hero) ? classes.selectedButton : ""
          }`}
          onClick={handleChooseChampion}
        >
          Choose Champion
        </Button>
        <Button className={classes.buttonModal} onClick={handleOpenSelectedHeroes}>
          Show Selected Heroes
        </Button>
      </Container>

      <Dialog
        open={showSelectedHeroesModal}
        onClose={handleCloseSelectedHeroes}
        className={classes.cardModalExternal}
      >
        <DialogContent className={classes.cardModal}>
          {selectedHeroes.map((selectedHero) => (
            <div key={selectedHero.id} className={classes.heroInfo}>
              <img src={selectedHero.images.sm} alt={selectedHero.name} />
              <div className={classes.heroInfoP}>
                <Typography variant="h6">{selectedHero.name}</Typography>
                <p>Raça: {selectedHero.appearance.race}</p>
                <p>Intelligence: {selectedHero.powerstats.intelligence}</p>
                <p>Strength: {selectedHero.powerstats.strength}</p>
                <p>Speed: {selectedHero.powerstats.speed}</p>
                <p>Durability: {selectedHero.powerstats.durability}</p>
                <p>Power: {selectedHero.powerstats.power}</p>
                <p>Combat: {selectedHero.powerstats.combat}</p>
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttonModal} onClick={handleCloseSelectedHeroes}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonModal;
