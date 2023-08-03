import { createContext, useState } from "react";
import PropTypes from "prop-types";

const PlayerContext = createContext();

export default PlayerContext;

export const PlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <PlayerContext.Provider value={{ currentEpisode, setCurrentEpisode, isPlaying, setIsPlaying }}>
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.any,
};
