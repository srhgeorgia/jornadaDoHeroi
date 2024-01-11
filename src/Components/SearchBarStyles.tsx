import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    display: "flex",
    flex: "1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    position: "relative",
    transition: "0.2s",
    padding: "15px 25px 15px 5px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "#1A191E",
    outline: "0",
  },
  searchBarExternal: {
    display: "flex",
    background: "#fff",
    alignItems: "center",
    boxShadow: "0 3px 8px -3px rgba(0,0,0,.2)",
    borderRadius: "8px",
    margin: "8px 28px 0px 0px"
  },
  icon: {
    color: "#ccc",
    padding: "0.5rem",
    marginLeft: "0.5rem",
    marginBottom: "2px",
  },
});

export default useStyles;
