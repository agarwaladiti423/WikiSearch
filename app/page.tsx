import Search from "./pages/searchPage/search";
import styles from "./page.module.css";

export default function Home() {
  return ( 
    <div className={styles.main}>
      <Search />
    </div>
  )
}
