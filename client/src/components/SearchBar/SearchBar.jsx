import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSearchedGame } from '../../Redux/actions';
import styles from './SearchBar.module.css'; 

function SearchBar(props) {
  const { setSearchedGame } = props;
  const [searchQuery, setSearchQuery] = useState('');

   

  const handleSearch = () => {
    const trimmedSearchQuery = searchQuery.trim();
    if (trimmedSearchQuery === '') {
      setSearchedGame([]); 
    } else {
      const lowerCaseQuery = trimmedSearchQuery.toString().toLowerCase();
      setSearchedGame(lowerCaseQuery)  
      }
  };

  return (
    <div className={`${styles['search-bar']}`}>
      <div className={styles['input-field']}>
        <input
          type="text"
          placeholder="Buscar un videojuego..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles['search-input']} 
        />
      </div>
      <button className={styles.buttonSmall} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  setSearchedGame,
};

export default connect(null, mapDispatchToProps)(SearchBar);
