"use client";

/* Component for handling search and displaying the search results */

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styles from "./search.module.css";
import useSearch from "../../useSearch";
import WikiList from "../../components/wikiList/WikiList";
import { WikiSearchHistory } from "@/app/components/wikiSearchHistory/WikiSearchHistory";
import { SearchErrorBoundary } from "./searchErrorBoundary";

const Search: React.FC = () => {
  const limit = 10;
  const [query, setQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const { loading, result, error } = useSearch(query, offset, limit);
  const searchRef = useRef<HTMLInputElement>(null);

  const imgSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/1920px-Wikipedia-logo-v2-en.svg.png";

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    if (searchQuery.trim().length > 0) {
      setQuery(searchQuery);
      setHistory((prevHistory) => [...prevHistory, searchQuery]);
    }
  };

  const handleDebounceChange = () => {
    let timer: NodeJS.Timeout;
    return function (event: ChangeEvent<HTMLInputElement>) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleChange(event);
      }, 1000);
    };
  };

  return (
    <>
    <SearchErrorBoundary onError={()=> console.error("Error has occured")}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={imgSrc} className={styles.logo} />
          <h1>Wikipedia Search Tool</h1>
        </div>
        <div className={styles.searchBoxWrapper}>
          <form className={styles.searchBox}>
            <input
              id="search"
              type="search"
              placeholder="Enter a search term"
              onChange={handleDebounceChange()}
              ref={searchRef}
              title="Search box"
              aria-label="Enter search term"
            />
          </form>
        </div>
      </header>
      <main className={styles.main}>
        <WikiSearchHistory history={history} setQuery={setQuery} />
        <div className={styles.resultWrapper}>
          <WikiList
            limit={limit}
            loading={loading}
            wikiResults={result}
            setOffset={setOffset}
          />
          {query.length ? <div>{loading && "Loading..."}</div> : null}
        </div>
      </main>
      </SearchErrorBoundary>
    </>
  );
};

export default Search;
