import React from "react";

const SeasonDisplay = (props) => {
    const { state, openHandler } = props;
    return (
        <div className="select-season">
            <h3>Seasons: </h3>
            {state.show.seasons.map((season) => {
                return (
                    <button
                        className="season-btn"
                        key={season.season}
                        onClick={() => openHandler(season)}
                    >
                        <h4>{season.season}</h4>
                        <img className="image" src={season.image} />
                        <div className="season-info">
                            <h5 className="season-title">{season.title}</h5>
                            <p>episodes: {season.episodes.length}</p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default SeasonDisplay;
