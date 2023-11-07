import { makeStyles } from "@material-ui/core";

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
    boxShadow: "0 20px 30px",
    borderRadius: "0 0 1rem 1rem",
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

export default useStyles;
