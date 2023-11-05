import { BrowserRouter } from "react-router-dom";
import { Link } from "@material-ui/core";
import styles from "../styles.module.css";
import AppRouter from "../AppRouter";

function Navs() {
  return (
    <BrowserRouter>
      <div>
        <nav className={styles.navs}>
          <Link href="/">Home</Link>
          <Link href="/cardHeroes">Cards</Link>
        </nav>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default Navs;
