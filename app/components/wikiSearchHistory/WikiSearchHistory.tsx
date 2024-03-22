import styles from "./WikiSearchHistory.module.css";

interface WikiSearchHistoryProps {
  history: string[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

/*
  Component that renders the search history
*/
export const WikiSearchHistory: React.FC<WikiSearchHistoryProps> = ({
  history,
  setQuery,
}) => {
  return (
    <div className={styles.historyWrapper}>
      <h3>Search History</h3>
      {history?.length > 0 ? (
        <ul>
          {history.map((item) => (
            <li onClick={() => setQuery(item)} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div>No search history found</div>
      )}
    </div>
  );
};
