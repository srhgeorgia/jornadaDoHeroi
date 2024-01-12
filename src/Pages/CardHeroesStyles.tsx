import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  containerPrincipal:{
    display: "flex",
    flexDirection: "row", 
    padding: "0rem",
    position: "relative",
  },
  cardContainer: {
    margin: "1rem",
    width: "16rem",
    boxShadow: "0 3px 8px -3px rgba(0,0,0,.2)",
    backgroundColor: "#016B79",
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
  },
  heroName:{
    marginBottom: "0rem",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  container:{
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "1rem",
    margin: "1rem 0rem",
    borderRadius: "8px",
  },
  imgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "none",
  },
  overlayInfo: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "5%",
    left: "63%",
    transform: "translateX(-50%)",
    color: "#FFFFFF",
    padding: "0",
    lineHeight: "0.5",
    margin: "0",
    width: "100%",
  },
  totalPower: {
    display: "flex",
    alignItems: "center",
    marginTop: "0",
  },
  sword: {
    fontSize: "20px",
    marginRight: "5px",
  },
  cardAction: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsModal:{
    backgroundColor:  "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    marginBottom: "0.5rem",
  },
  headerCard: {
    flex: "0 0 auto", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, 
    position: "fixed",
    right: 0,
  },
});

export default useStyles;
