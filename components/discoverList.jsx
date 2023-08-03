import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PropTypes from "prop-types";
import SeasonList from "../SeasonList/SeasonList";

const DiscoverList = ({ shows }) => {
  const [randomShows, setRandomShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const getRandomPodcasts = (count) => {
      const shuffledPodcasts = shows.sort(() => Math.random() - 0.5);
      const randomPodcasts = shuffledPodcasts.slice(0, count);
      return randomPodcasts;
    };

    const numberOfPodcasts = 10;
    const randomPodcasts = getRandomPodcasts(numberOfPodcasts);
    setRandomShows(randomPodcasts);
  }, [shows]);

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="slick-prev"
        style={{ border: "none", background: "transparent" }}
      >
        <NavigateBeforeIcon sx={{ color: "#4c8bf5" }} />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="slick-next"
        style={{ border: "none", background: "transparent" }}
      >
        <NavigateNextIcon sx={{ color: "#4c8bf5" }} />
      </button>
    );
  };

  const settings = {
    draggable: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleShow = (showId) => {
    setSelectedShowId(showId);
    setDialogOpen(true);
  };

  const handleDialog = () => {
    setSelectedShowId(null);
    setDialogOpen(false);
  };

  return (
    <>
      <div className="mt-5 max-w-screen flex flex-col justify-self-center content-center">
        <h2 className="mb-5 ml-3">Podcasts you may be interested in...</h2>
        <div className="flex justify-center items-center">
          <Slider
            {...settings}
            className="w-3/4"
            ref={sliderRef}
          >
            {randomShows.map((show) => (
              <div
                key={show.id}
                className="rounded-lg text-left cursor-pointer object-fill border-none"
                onClick={() => handleShow(show.id)}
              >
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full top-0 rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <SeasonList
        show={randomShows.find((show) => show.id === selectedShowId)}
        isOpen={dialogOpen}
        onClose={handleDialog}
        selectedShowId={selectedShowId}
      />
    </>
  );
};

DiscoverList.propTypes = {
  shows: PropTypes.array,
  onClick: PropTypes.func,
};

export default DiscoverList;