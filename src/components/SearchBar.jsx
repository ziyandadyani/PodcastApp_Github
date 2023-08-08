import React from "react";

const SearchBar = ({ openSearchHandler, searchBar }) => {
    const seacrh = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    };
    return (
        <div className="search-bar">
            <input
                className="title-search-input"
                onChange={seacrh}
                type="text"
            />
            <button onClick={openSearchHandler}>
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </div>
    );
};

export default SearchBar;
