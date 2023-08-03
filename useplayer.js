import { useContext } from "react";
import PlayerContext from "../Context/PlayerProvider";

export const usePlayer = () => {
  return useContext(PlayerContext);
};
