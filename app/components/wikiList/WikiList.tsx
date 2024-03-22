import { SearchResult } from "@/app/types";
import React, { useCallback, useRef } from "react";
import styles from "./WikiList.module.css";

interface WikiListProps {
  wikiResults: SearchResult[];
  loading: boolean;
  limit: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

/*
  Renders the wiki search results
*/
const WikiList: React.FC<WikiListProps> = ({
  wikiResults,
  loading,
  limit,
  setOffset,
}) => {
  let observer = useRef<IntersectionObserver>();

  /* Intersection observer used for optimizing network calls on scroll */
  const lastElementRef = useCallback(
    (node: Element) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  function handleClick(title: string): void {
    const url = `https://en.wikipedia.org/wiki/${title}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <>
      {wikiResults.map((item, index) => (
        <div
          key={index}
          className={styles.card}
          ref={wikiResults.length === index + 1 ? lastElementRef : null}
        >
          <p>{item?.title}</p>
          <div className={styles.footer}>
            <div>{new Date(item?.timestamp).toDateString()}</div>
            <button
              className={styles.readMore}
              onClick={() => handleClick(item.title)}
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default WikiList;
