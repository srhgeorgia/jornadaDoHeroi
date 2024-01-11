import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import useStyles from "./SearchBarStyles";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchText);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText, onSearch]);

  useEffect(() => {
    const inputElement = document.getElementById(
      "default-search",
    ) as HTMLInputElement;
    const iconElement = document.querySelector(
      `.${classes.icon}`,
    ) as HTMLElement;

    const handleFocus = () => {
      iconElement.style.color = "#1A191E";
    };

    const handleBlur = () => {
      iconElement.style.color = "#ccc";
    };

    inputElement.addEventListener("focus", handleFocus);
    inputElement.addEventListener("blur", handleBlur);

    return () => {
      inputElement.removeEventListener("focus", handleFocus);
      inputElement.removeEventListener("blur", handleBlur);
    };
  }, [classes.icon]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={classes.searchBarExternal}>
      <FaSearch className={classes.icon} />
      <input
        type="search"
        id="default-search"
        placeholder="Search Heroes by Name"
        className={classes.input}
        value={searchText}
        onChange={handleSearchChange}
        required
      />
    </div>
  );
};

export default SearchBar;
