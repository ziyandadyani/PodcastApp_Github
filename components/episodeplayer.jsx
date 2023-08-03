import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { styled, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { usePlayer } from "../../Hooks/usePlayer";

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.8,
  fontWeight: 500,
  letterSpacing: 0.2,
  paddingLeft: "1rem",
});

const EpisodePlayer = () => {
  const { currentEpisode, isPlaying, setIsPlaying } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

  const handleSliderChange = (newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {currentEpisode ? (
        <div className="fixed max-w-screen h-15 bottom-10 left-0 right-0 bg-white z-10">
          <div className="text-center">
            <h4 className="text-xs px-1.5 pb-1 font-bold">
              {currentEpisode.title}
            </h4>
          </div>

          <div className="flex flex-row items-center justify-center">
            <Button variant="text" onClick={togglePlayPause}>
              {isPlaying ? (
                <PauseCircleIcon />
              ) : (
                <PlayCircleIcon />
              )}
            </Button>

            {currentTime !== 0 && duration !== 0 && (
              <Slider
                aria-label="time-indicator"
                size="small"
                value={currentTime}
                min={0}
                max={duration}
                onChange={handleSliderChange}
                sx={{
                  width: 200,
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&:before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
            )}

            <TinyText>
              <span>{formatTime(duration - currentTime)}</span>
            </TinyText>

            <audio
              src={currentEpisode.file}
              ref={audioRef}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
        </div>
      ) : (
        <div className="fixed max-w-screen h-15 bottom-10 left-0 right-0 bg-white z-10">
          <div className="text-center">
            <h4 className="text-xs px-1.5 pb-1 font-bold"></h4>
          </div>

          <div className="flex flex-row items-center justify-center">
            <Button variant="text">
              <PlayCircleIcon className="nav-icon" />
            </Button>

            <Slider
              aria-label="time-indicator"
              size="small"
              sx={{
                width: 200,
                height: 4,
              }}
            />

            <TinyText>
              <span>0:00</span>
            </TinyText>
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodePlayer;