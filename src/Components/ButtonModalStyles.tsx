import { makeStyles } from "@material-ui/core";

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

export default useStyles;
