import React from "react";
import { calcTime } from "../utilities/calculate.time";

const AudioPlayer = (props) => {
    const { state } = props;

    // State
    const [audState, setAudState] = React.useState({
        isPlaying: false,
        episode: "",
    });

    function playPause() {
        const prevIsPlaying = audState.isPlaying;
        setAudState((prev) => ({
            ...prev,
            isPlaying: !prevIsPlaying,
        }));

        // if (!prevIsPlaying) {
        //     audioPlayer.current.play();
        // } else {
        //     audioPlayer.current.pause();
        // }
    }

    React.useEffect(() => {
        setAudState(state);
    }, [state]);

    return (
        <>
            {audState.episode && (
                <div className="audio-player">
                    <button
                        onClick={() => {
                            setAudState({ isPlaying: false, episode: "" });
                        }}
                    >
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <audio
                        controls
                        // ref={audioPlayer}
                        autoPlay
                        src={state.episode.file}
                        preload="metadata"
                    ></audio>
                </div>
            )}
        </>
    );
};

export default AudioPlayer;

// React.useEffect(() => {
//     if (audioPlayer.current && audioPlayer.current.duration) {
//         const seconds = Math.floor(audioPlayer.current.duration);
//         setDuration(seconds);
//         progressBar.current.max = seconds;
//     }
//     setAudState(state);
// }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

// function changeRange() {
//     audioPlayer.current.currentTime = progressBar.current.value;
//     progressBar.current.style.setProperty(
//         "--seek-before-width",
//         `${(progressBar.current.value / duration) * 100}%`
//     );
//     setCurrentTime(progressBar.current.value);
// }

// const [duration, setDuration] = React.useState(0);
//     const [currentTime, setCurrentTime] = React.useState(0);

//     // references
//     const audioPlayer = React.useRef();
//     const progressBar = React.useRef();

{
    /* <div className="progress">
                        <input
                            type="range"
                            className="progress-bar"
                            defaultValue="0"
                            ref={progressBar}
                            onChange={changeRange}
                        />
                        <div className="time">
                            <div className="current-time">
                                {calcTime(currentTime)}
                            </div>
                            <div className="duration">{calcTime(duration)}</div>
                        </div>
                    </div>

                    <div className="audio-player-controls">
                        <button className="next-prev-episode">
                            <ion-icon name="play-skip-back-outline"></ion-icon>
                        </button>
                        <button onClick={playPause} className="play-pause-btn">
                            {audState.isPlaying ? (
                                <ion-icon name="pause-outline"></ion-icon>
                            ) : (
                                <ion-icon name="play-outline"></ion-icon>
                            )}
                        </button>
                        <button className="next-prev-episode">
                            <ion-icon name="play-skip-forward-outline"></ion-icon>
                        </button>
                    </div> */
}
