import React from "react";

const EpisodeDisplay = (props) => {
    const { episodes, playEpHandler } = props;

    function play(ep) {
        playEpHandler(ep);
    }

    return (
        <div className="select-episode">
            <h3>Episodes: </h3>
            {episodes && (
                <div className="episodes">
                    {episodes.map((episode) => {
                        return (
                            <div
                                className="episode"
                                key={episode.title}
                                onClick={() => {
                                    play(episode);
                                }}
                            >
                                <div className="episode-title">
                                    <small>{episode.episode}.</small>
                                    <h5>{episode.title}</h5>
                                </div>
                                <ion-icon name="play-outline"></ion-icon>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default EpisodeDisplay;
