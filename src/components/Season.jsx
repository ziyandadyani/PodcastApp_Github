import React from "react";
import EpisodeDisplay from "./EpisodeDisplay.jsx";

const Season = (props) => {
    const {
        state,
        closeHandler,
        nextSeasonHandler,
        previousSeasonHandler,
        playEpHandler,
    } = props;
    const { season } = state;
    const numSeasons = state.show.seasons.length;

    const showPrevBtn = season.season <= 1 ? false : true;
    const showNextBtn = season.season === numSeasons ? false : true;

    return (
        <div>
            <dialog
                className="season-dialog"
                open={state.season ? true : false}
            >
                <button className="back-to-season" onClick={closeHandler}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </button>

                <div className="seasons">
                    {showPrevBtn && (
                        <div
                            className="prev-season"
                            onClick={previousSeasonHandler}
                        >
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </div>
                    )}
                    <button className="season-selected">
                        <h4>{season.season}</h4>
                        <img className="image" src={season.image} />
                        <div className="season-info">
                            <h5 className="season-title">{season.title}</h5>
                        </div>
                    </button>
                    {showNextBtn && (
                        <div
                            className="next-season"
                            onClick={nextSeasonHandler}
                        >
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </div>
                    )}
                </div>

                <EpisodeDisplay
                    episodes={season.episodes}
                    playEpHandler={playEpHandler}
                />
            </dialog>
        </div>
    );
};

export default Season;
