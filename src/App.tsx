import "./styles.module.css";
import { BrowserRouter } from "react-router-dom";
import { Link } from "@material-ui/core";
import styles from "./styles.module.css";
import AppRouter from "./AppRouter";

function App() {
  return (
    <BrowserRouter>
      <header className={styles.headerNavs}>
        <div className={styles.containerNav}>
          <div className={styles.titleNav}>
            <h1 className={styles.title}>🦸 The Battle</h1>
          </div>

          <div className={styles.navs}>
            <div className={styles.navsLinks}>
              <Link href="/" style={linkStyle}>
              🏠 Home
              </Link>
              <Link href="/cardHeroes" style={linkStyle}>
              🗃️ Cards
              </Link>
            </div>
          </div>
        </div>
      </header>
      <AppRouter />
    </BrowserRouter>
  );
}

const linkStyle = {
  color: "black",
  textDecoration: "none",
  marginRight: "1.5rem",
  fontWeight: "700",
  fontSize: "15px",
  lineHeight: "18px",
  "&:hover": {
    opacity: "0.1",
    transition: "0.2s",
  },
};

export default App;
