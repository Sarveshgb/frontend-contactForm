import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Update search as the user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Ensure search happens on submit too
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchTerm}
        onChange={handleChange} // Call handleChange instead of inline update
        className="search-input"
      />
     
    </form>
  );
};

export default SearchBar;
