import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  buttonModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    boxSizing: "border-box",
    color: "#6E6C6C",
    padding: "0rem",
    "&:hover": {
      opacity: "0.4",
      transition: "0.2s",
    },
  },
  selectedButton: {
    color: "#FF0200",
  },
  buttonsModal: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 0.8rem",
  },
  cardModal: {
    display: "flex",
    alignItems: "center",
  },
  cardModalExternal: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
      backgroundColor: "#F4F4F4",
      boxShadow: "0 3px 8px -3px rgba(0,0,0,.2)",
    },
  },
  heroInfo: {
    margin: "2rem 3rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "black",
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
    color: "black",
  },
  winnerText: {
    color: "#27D11F",
  },
  iconBattle: {
    fontSize: "20px",
    marginRight: "5px",
  },
  divInfo: {
    backgroundColor: "#016B79",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 3px 8px -3px rgba(0,0,0,.2)",
  },
  contentInfo: {
    backgroundColor: "#FFFFFF",
    padding: "1rem",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 3px 8px -3px rgba(0,0,0,.2)",
  },
});

export default useStyles;
