import React, { useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
import css from './SearchBar.module.css'

export default function SearchBar(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.currentTarget.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            alert('Enter your request');
            return;
        }
        props.onSubmit(searchQuery);
        setSearchQuery('');
        e.currentTarget.reset();
    }

    return (
        <header className={css.Searchbar}>
            <form onSubmit={handleSubmit} className={css.SearchForm}>
                <button type="submit" className={css.SearchFormButton}>
                    <AiOutlineSearch size='30' />
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}