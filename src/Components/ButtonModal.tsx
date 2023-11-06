import React, { useState } from "react";
import {
  Button,
  Dialog,
  makeStyles,
  DialogContent,
  DialogActions,
  Container,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { HeroData } from "../types";
import { GiBattleGear } from "react-icons/gi";
import { BiShow } from "react-icons/bi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";

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
    width: "100%",
  },
  cardModal: {
    display: "flex",
    alignItems: "center",
  },
  cardModalExternal: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      boxShadow: "0 0 20px white",
    },
  },
  heroInfo: {
    margin: "2rem 3rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
  },
  heroInfoP: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
    alignItems: "center",
  },
  winner: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#fff",
    textShadow: "0.1em 0.1em 1.2em #ccc",
  },
  winnerText: {
    color: "#27D11F",
  },
  iconBattle: {
    fontSize: "20px",
    marginRight: "5px",
  },
  imgModal: {
    boxShadow: "0 0 30px",
    borderRadius: "1rem",
  },
  divInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const AlertModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={true} onClose={onClose} className={classes.cardModalExternal}>
      <DialogContent className={classes.cardModal}>
        <Typography variant="h6">No champions selected</Typography>
      </DialogContent>
      <DialogActions>
        <Button className={classes.buttonModal} onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const compareAttributes = (hero1: HeroData, hero2: HeroData) => {
  const attributes = [
    "intelligence",
    "strength",
    "speed",
    "durability",
    "power",
    "combat",
  ];

  const comparisonResult: { [key: string]: React.ReactNode } = {};

  for (const attribute of attributes) {
    const hero1Value = hero1.powerstats[attribute];
    const hero2Value = hero2.powerstats[attribute];

    if (hero1Value > hero2Value) {
      comparisonResult[attribute] = (
        <span style={{ display: "flex" }}>
          {`${hero1.name}`} <AiOutlineArrowUp style={{ color: "green" }} />
          {`${hero2.name}`} <AiOutlineArrowDown style={{ color: "red" }} />
        </span>
      );
    } else if (hero2Value > hero1Value) {
      comparisonResult[attribute] = (
        <span style={{ display: "flex" }}>
          {`${hero2.name}`} <AiOutlineArrowUp style={{ color: "green" }} />
          {`${hero1.name}`} <AiOutlineArrowDown style={{ color: "red" }} />
        </span>
      );
    } else {
      comparisonResult[attribute] = (
        <span>
          <FaEquals />
        </span>
      );
    }
  }

  return comparisonResult;
};

const ButtonModal: React.FC<ButtonModalProps> = React.memo(
  ({ hero, selectedHeroes, setSelectedHeroes }) => {
    const classes = useStyles();
    const [showSelectedHeroesModal, setShowSelectedHeroesModal] =
      useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [attributeComparison, setAttributeComparison] = useState<{
      [key: string]: React.ReactNode;
    } | null>(null);

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

        const comparisonResult = compareAttributes(
          selectedHeroes[0],
          selectedHeroes[1],
        );
        setAttributeComparison(comparisonResult);

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
        <div className={classes.buttonsModal}>
          <Tooltip title="Escolher campeão" arrow>
            <Button
              className={`${classes.buttonModal} ${
                selectedHeroes.includes(hero) ? classes.selectedButton : ""
              }`}
              onClick={handleChooseChampion}
            >
              <GiBattleGear className={classes.iconBattle} />
            </Button>
          </Tooltip>

          <Tooltip title="Ver campeões" arrow>
            <Button
              className={classes.buttonModal}
              onClick={handleOpenSelectedHeroes}
            >
              <BiShow className={classes.iconBattle} />
            </Button>
          </Tooltip>
        </div>
        <Dialog
          open={showSelectedHeroesModal}
          onClose={handleCloseSelectedHeroes}
          className={classes.cardModalExternal}
        >
          <DialogContent>
            {winner && (
              <Typography className={classes.winner}>
                <span className={classes.winnerText}>Winner:</span> {winner}
              </Typography>
            )}
            <Container className={classes.cardModal}>
              {selectedHeroes.map((selectedHero) => (
                <div key={selectedHero.id} className={classes.heroInfo}>
                  <div className={classes.divInfo}>
                    <img
                      className={classes.imgModal}
                      src={selectedHero.images.sm}
                      alt={selectedHero.name}
                    />
                    <Typography variant="h6">{selectedHero.name}</Typography>
                  </div>
                  <div className={classes.heroInfoP}>
                    {attributeComparison && (
                      <>
                        <p>
                          Intelligence: {selectedHero.powerstats.intelligence}{" "}
                          {attributeComparison.intelligence}
                        </p>
                        <p>
                          Strength: {selectedHero.powerstats.strength}{" "}
                          {attributeComparison.strength}
                        </p>
                        <p>
                          Speed: {selectedHero.powerstats.speed}{" "}
                          {attributeComparison.speed}
                        </p>
                        <p>
                          Durability: {selectedHero.powerstats.durability}{" "}
                          {attributeComparison.durability}
                        </p>
                        <p>
                          Power: {selectedHero.powerstats.power}{" "}
                          {attributeComparison.power}
                        </p>
                        <p>
                          Combat: {selectedHero.powerstats.combat}{" "}
                          {attributeComparison.combat}
                        </p>
                      </>
                    )}
                    <p>Total Power: {calculateTotalPower(selectedHero)}</p>
                  </div>
                </div>
              ))}
            </Container>
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

        {showAlertModal && <AlertModal onClose={handleAlertModalClose} />}
      </>
    );
  },
);

export default ButtonModal;
