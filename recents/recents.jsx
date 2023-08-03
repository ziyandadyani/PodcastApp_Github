import { useState, useRef, useEffect } from "react";
import useRecentStore from "../../Model/useRecentStore";
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

const Recents = () => {
  const { setCurrentEpisode, isPlaying, setIsPlaying } = usePlayer()
  const recentEpisodes = useRecentStore((state) => state.recentEpisodes);
  const [currentPlayingEpisode, setCurrentPlayingEpisode] = useState(null)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    useRecentStore.getState().setRecentEpisodes(recentEpisodes);
  }, [recentEpisodes]);

  const handleClearRecentEpisodes = () => {
    useRecentStore.getState().clearRecentEpisodes();
  };

  const togglePlayPause = (episode) => {
    if (currentPlayingEpisode === episode) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    } else {
      setCurrentPlayingEpisode(episode);
      setIsPlaying(true);
      audioRef.current.src = episode.file;
      audioRef.current.play();
    }

    setCurrentEpisode(isPlaying ? null : episode)
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

  const handleSliderChange = (newValue) => {
    if (currentPlayingEpisode) {
      setCurrentTime(newValue);
      audioRef.current.currentTime = newValue;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!recentEpisodes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-14 mb-32">
      <h2 className="text-lg px-2 py-1 font-bold">Recently listened to:</h2>
      {recentEpisodes.length === 0 ? (
        <p className="text-sm px-2 py-1">No recently listened episodes yet.</p>
      ) : (
        <div className="mt-2">
          <Button
            variant="contained"
            sx={{ marginLeft: "10px" }}
            onClick={handleClearRecentEpisodes}
          >
            Reset All Progress
          </Button>
          {recentEpisodes.map(({ episode, timestamp }) => (
            <div
              key={episode.title}
              className="mt-4 max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
            >
              <h4 className="text-sm px-1.5 py-1 font-bold">{episode.title}</h4>
              <p className="text-xs px-1.5 pb-1">Episode {episode.episode}</p>
              <p className="text-xs px-1.5 pb-1">{episode.description}</p>
              <p className="text-xs px-1.5 pb-1">
                Added on: {new Date(timestamp).toLocaleString()}
              </p>

              <div className="flex flex-row items-center justify-center">
                <Button onClick={() => togglePlayPause(episode)}>
                  {currentPlayingEpisode === episode && isPlaying ? (
                    <PauseCircleIcon className="nav-icon" />
                  ) : (
                    <PlayCircleIcon className="nav-icon" />
                  )}
                </Button>

                <Slider
                  aria-label="time-indicator"
                  size="small"
                  value={currentPlayingEpisode === episode ? currentTime : 0}
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

                <TinyText>{formatTime(duration - currentTime)}</TinyText>
              </div>

              <audio
                src={episode.file}
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onPause={() => setCurrentPlayingEpisode(null)}
                onEnded={() => setCurrentPlayingEpisode(null)}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recents;
