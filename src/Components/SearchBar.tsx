import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchText);
    }, 300); 
    return () => clearTimeout(delayDebounceFn);
  }, [searchText, onSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
