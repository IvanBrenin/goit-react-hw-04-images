import React, { useState } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import css from './App.module.css'


function App() {
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearchFormSubmit = (query) => {
    setSearchQuery(query);
  }

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleSearchFormSubmit} />
      {searchQuery && <ImageGallery searchQuery={searchQuery} />}
    </div>
  );
}

export default App;