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
import { GiBattleGear } from "react-icons/gi";
import { BiShow } from "react-icons/bi";

interface ButtonModalProps {
  hero: HeroData;
  selectedHeroes: HeroData[];
  setSelectedHeroes: (heroes: HeroData[]) => void;
}

const useStyles = makeStyles({
  buttonModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    boxSizing: "border-box",
    backgroundColor: "#363582",
    color: "#fff",
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
    justifyContent: "space-between",
    padding: "0 1rem",
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
  winner: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  iconBattle: {
    fontSize: "20px",
    marginRight: "5px",
  },
});

const AlertModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={true} onClose={onClose} className={classes.cardModalExternal}>
      <DialogContent className={classes.cardModal}>
        <Typography variant="h6">Sem campeões selecionados</Typography>
      </DialogContent>
      <DialogActions>
        <Button className={classes.buttonModal} onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ButtonModal: React.FC<ButtonModalProps> = React.memo(
  ({ hero, selectedHeroes, setSelectedHeroes }) => {
    const classes = useStyles();
    const [showSelectedHeroesModal, setShowSelectedHeroesModal] =
      useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const handleOpenSelectedHeroes = () => {
      if (selectedHeroes.length === 0) {
        setShowAlertModal(true);
      } else {
        setShowSelectedHeroesModal(true);
      }
    };

    const handleCloseSelectedHeroes = () => {
      setShowSelectedHeroesModal(false);
    };

    const handleAlertModalClose = () => {
      setShowAlertModal(false);
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
        const totalPower1 = calculateTotalPower(selectedHeroes[0]);
        const totalPower2 = calculateTotalPower(selectedHeroes[1]);

        if (totalPower1 > totalPower2) {
          setWinner(selectedHeroes[0].name);
        } else if (totalPower2 > totalPower1) {
          setWinner(selectedHeroes[1].name);
        } else {
          setWinner("Empate");
        }

        setShowSelectedHeroesModal(true);
      }
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

    return (
      <>
        <Container className={classes.buttonsModal}>
          <Button
            className={`${classes.buttonModal} ${
              selectedHeroes.includes(hero) ? classes.selectedButton : ""
            }`}
            onClick={handleChooseChampion}
          >
            <GiBattleGear className={classes.iconBattle} />
          </Button>
          <Button
            className={classes.buttonModal}
            onClick={handleOpenSelectedHeroes}
          >
            <BiShow className={classes.iconBattle} />
          </Button>
        </Container>

        <Dialog
          open={showSelectedHeroesModal}
          onClose={handleCloseSelectedHeroes}
          className={classes.cardModalExternal}
        >
          <DialogContent className={classes.cardModal}>
            {winner && (
              <Typography className={classes.winner}>
                Winner: {winner}
              </Typography>
            )}
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
                  <p>Total Power: {calculateTotalPower(selectedHero)}</p>
                </div>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.buttonModal}
              onClick={handleCloseSelectedHeroes}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal de aviso */}
        {showAlertModal && <AlertModal onClose={handleAlertModalClose} />}
      </>
    );
  },
);

export default ButtonModal;
