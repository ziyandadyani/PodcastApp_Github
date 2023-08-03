import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { genreMapping } from "../../Utils/genreMapping";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const descStyles = {
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const SeasonList = ({ show, isOpen, onClose, selectedShowId }) => {
  const [showDetails, setShowDetails] = useState({ seasons: [] });
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [seasonSelect, setSeasonSelect] = useState("");
  const moreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedShowId) {
      const fetchEpisodes = async () => {
        try {
          const response = await fetch(
            `https://podcast-api.netlify.app/id/${selectedShowId}`
          );
          if (!response.ok) {
            throw new Error("Something went wrong. Try again later.");
          }
          const data = await response.json();
          setShowDetails(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchEpisodes();
    }
  }, [selectedShowId]);

  useEffect(() => {
    if (moreRef.current) {
      setShowMoreButton(
        moreRef.current.scrollHeight !== moreRef.current.clientHeight
      );
    }
  }, []);

  const handleSeasonSelect = (event) => {
    setSeasonSelect(event.target.value);
    navigate(`/${selectedShowId}/episodes`, { state: showDetails });
  };

  const handleClose = () => {
    setSeasonSelect("");
    onClose();
    setIsDescOpen(false);
  };

  if (!show) {
    return <div></div>
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <div className="w-72 h-144">
          <Button onClick={handleClose} className="z-10">
            <CloseIcon />
          </Button>
          <img src={show.image} alt={show.title} className="w-full h-52" />
          <h3 className="text-sm px-1.5 py-1 font-bold">{show.title}</h3>

          <Button
            sx={{ margin: 1 }}
            variant="contained"
            onClick={handleSeasonSelect}
          >
            Go To
            {showDetails.seasons.length > 0 &&
              showDetails.seasons.map((season) => (
                <p key={season.season}>{seasonSelect}</p>
              ))}
          </Button>

          <p className="text-xs px-1.5 pb-1">
            {show.genres.map((genreId) => genreMapping[genreId]).join(", ")}
          </p>
          <p className="text-xs px-1.5 pb-1">
            Last Updated:{" "}
            {new Date(show.updated).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div>
            <p
              style={isDescOpen ? null : descStyles}
              ref={moreRef}
              className="text-xs px-1.5 pb-1"
            >
              {show.description}
            </p>
            {showMoreButton && (
              <Button
                variant="text"
                size="small"
                onClick={() => setIsDescOpen(!isDescOpen)}
              >
                {isDescOpen ? "read less..." : "read more..."}
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

SeasonList.propTypes = {
  show: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedShowId: PropTypes.string,
};

export default SeasonList;