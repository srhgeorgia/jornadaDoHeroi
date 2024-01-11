import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Container,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { HeroData } from "../types";
import { GiBattleGear } from "react-icons/gi";
import useStyles from "./ButtonModalStyles";

interface ButtonModalProps {
  hero: HeroData;
  selectedHeroes: HeroData[];
  setSelectedHeroes: (heroes: HeroData[]) => void;
}

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

const ButtonModal: React.FC<ButtonModalProps> = React.memo(
  ({ hero, selectedHeroes, setSelectedHeroes }) => {
    const classes = useStyles();
    const [showSelectedHeroesModal, setShowSelectedHeroesModal] =
      useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

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
        <div className={classes.buttonsModal}>
          <Tooltip title="Escolher campeão" arrow>
            <Button
              className={`${classes.buttonModal} ${
                selectedHeroes.includes(hero) ? classes.selectedButton : ""
              }`}
              onClick={handleChooseChampion}
            >
              <GiBattleGear className={classes.iconBattle} />
              <h3>Choose Champion</h3>
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
                    <div className={classes.contentInfo}>
                      <img
                        src={selectedHero.images.sm}
                        alt={selectedHero.name}
                      />
                      <h2>{selectedHero.name}</h2>
                      <p>
                        Total Power: <b>{calculateTotalPower(selectedHero)}</b>
                      </p>
                    </div>
                  </div>

                  <div className={classes.heroInfoP}>
                    <>
                      <p>
                        Intelligence:{" "}
                        <b>{selectedHero.powerstats.intelligence}</b>{" "}
                      </p>
                      <p>
                        Strength: <b>{selectedHero.powerstats.strength}</b>{" "}
                      </p>
                      <p>
                        Speed: <b>{selectedHero.powerstats.speed}</b>{" "}
                      </p>
                      <p>
                        Durability: <b>{selectedHero.powerstats.durability}</b>{" "}
                      </p>
                      <p>
                        Power: <b>{selectedHero.powerstats.power}</b>{" "}
                      </p>
                      <p>
                        Combat: <b>{selectedHero.powerstats.combat}</b>{" "}
                      </p>
                    </>
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
  }
);

export default ButtonModal;
