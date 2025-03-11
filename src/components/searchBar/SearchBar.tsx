import React from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="search-bar">
      <img src="./images/logo.png" alt="logo" className="logo-icon" />
      <div className="bar">
        <input
          type="text"
          placeholder="Pesquisar notas"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <img src="/images/search.png" alt="search" className="search-icon" />
      </div>
      <img src="/images/close.png" alt="close" className="close-icon" />
    </div>
  );
};

export default SearchBar;
