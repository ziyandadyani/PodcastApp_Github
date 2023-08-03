import { useState } from "react";
import { useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EpisodeListComp from "./episodeListcomp";

const EpisodeList = () => {
  const location = useLocation();
  const showDetails = location.state;
  const [seasonSelected, setSeasonSelected] = useState("");
  const [selectedSeasonDetails, setSelectedSeasonDetails] = useState(null);

  const handleSeasonSelect = (event) => {
    const selectedSeason = event.target.value;
    setSeasonSelected(selectedSeason);

    const seasonDetails = showDetails.seasons.find(
      (season) => season.season === selectedSeason
    );
    setSelectedSeasonDetails(seasonDetails);
  };

  return (
    <div className="mt-14 mb-32 max-w-screen">
      <div className="flex w-full h-1/2 justify-evenly items-center">
        <img
          src={showDetails.image}
          alt={showDetails.title}
          className="w-1/5 rounded-sm my-1"
        />
        <h3 className="text-2xl px-1.5 py-1 font-extrabold">
          {showDetails.title}
        </h3>
      </div>
      <div className="px-2 text-center pb-2">
        <p className="text-sm">{showDetails.description}</p>
      </div>

      <div className="text-center pb-2">
        <FormControl sx={{ m: 1, width: 150 }} size="small">
          <InputLabel sx={{ fontSize: 13, marginTop: "-5px" }}>
            Select Season
          </InputLabel>
          <Select
            sx={{ height: 25, fontSize: 13 }}
            size="small"
            label="Select Season"
            value={seasonSelected}
            onChange={handleSeasonSelect}
          >
            {showDetails.seasons.length > 0 &&
              showDetails.seasons.map((season) => (
                <MenuItem
                  sx={{ fontSize: 13 }}
                  key={season.season}
                  value={season.season}
                >
                  <span style={{ fontWeight: "bold" }}>{season.title}</span> (
                  {season.episodes.length} episode
                  {season.episodes.length <= 1 ? "" : "s"})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      {selectedSeasonDetails &&
        selectedSeasonDetails.episodes.map((episode) => (
          <EpisodeListComp episode={episode} key={episode.title} />
        ))}
    </div>
  );
};

export default EpisodeList;