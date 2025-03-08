const BlogFilter = ({ categories, filters, onFilterChange, onResetFilters }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      onFilterChange(name, value);
    };
  
    return (
      <div className="blog-filter">
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            name="category" 
            value={filters.category} 
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
  
        <div className="filter-group">
          <label htmlFor="dateRange">Date</label>
          <select 
            id="dateRange" 
            name="dateRange" 
            value={filters.dateRange} 
            onChange={handleChange}
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
  
        <button 
          onClick={onResetFilters} 
          className="reset-filter-button"
          disabled={!filters.category && !filters.dateRange && !filters.searchTerm}
        >
          Reset Filters
        </button>
      </div>
    );
  };
  
  export default BlogFilter;