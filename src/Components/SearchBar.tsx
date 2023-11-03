import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchText);
    }, 300); 
    return () => clearTimeout(delayDebounceFn);
  }, [searchText, onSearch]);

  useEffect(() => {
    const inputElement = document.getElementById("default-search") as HTMLInputElement;
    const iconElement = document.querySelector(`.${styles.icon}`) as HTMLElement;

    const handleFocus = () => {
      iconElement.style.color = "#1A191E"; 
    };

    const handleBlur = () => {
      iconElement.style.color = "white"; 
    };

    inputElement.addEventListener("focus", handleFocus);
    inputElement.addEventListener("blur", handleBlur);

    return () => {
      inputElement.removeEventListener("focus", handleFocus);
      inputElement.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={styles.searchBarExternal}>
      <FaSearch className={styles.icon} />
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Heroes by Name"
        value={searchText}
        onChange={handleSearchChange}
        required
      />
    </div>
  );
};

export default SearchBar;
