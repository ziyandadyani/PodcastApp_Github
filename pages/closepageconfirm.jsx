import { useEffect } from "react";
import { usePlayer } from "../../Hooks/usePlayer";

const ConfirmClosePage = () => {
  const { currentEpisode, isPlaying } = usePlayer()

  useEffect(() => {
    if (currentEpisode && isPlaying === true) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [currentEpisode, isPlaying]);

  return null;
};

export default ConfirmClosePage;

