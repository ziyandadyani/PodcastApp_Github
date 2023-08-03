import { useState } from "react";
import Fuse from "fuse.js";
import { genreMapping } from "../../Utils/genreMapping";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const SearchShows = ({ shows, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fuseOptions = {
    keys: ["title"],
    threshold: 0.3,
  };

  const fuse = new Fuse(shows, fuseOptions);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    performSearch(e.target.value, selectedGenre, sortOption);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    performSearch(searchTerm, e.target.value, sortOption);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    performSearch(searchTerm, selectedGenre, e.target.value);
  };

  const performSearch = (term, genre, sort) => {
    let results = shows.slice();

    if (term) {
      const fuseResults = fuse.search(term);
      results = fuseResults.map((result) => result.item);
    }

    if (genre) {
      results = results.filter((show) => show.genres.includes(parseInt(genre)));
    }

    if (sort === "az") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      results.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "dateAsc") {
      results.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (sort === "dateDesc") {
      results.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    if (!term && !genre && !sort) {
      results = "";
    }

    onSearchResults(results);
  };

  return (
    <div className="max-w-screen flex justify-center">
      <div className="mt-16 w-365 flex flex-col">
        <div className="w-full">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "30px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <div className="w-full flex flex-row justify-between">
          <FormControl sx={{ width: "45%", height: "30px" }}>
            <InputLabel sx={{ marginTop: '-7px' }}>All Genres</InputLabel>
            <Select
              label="All Genres"
              value={selectedGenre}
              onChange={handleGenreChange}
              sx={{
                marginTop: "5px",
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <MenuItem value="">All Genres</MenuItem>
              {Object.entries(genreMapping).map(([id, genre]) => (
                <MenuItem key={id} value={id}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "45%", height: "30px" }}>
            <InputLabel sx={{ marginTop: '-7px' }}>Sort by</InputLabel>
            <Select
              label="Sort by"
              value={sortOption}
              onChange={handleSortChange}
              sx={{
                marginTop: "5px",
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <MenuItem value="">Sort by</MenuItem>
              <MenuItem value="az">Title (A to Z)</MenuItem>
              <MenuItem value="za">Title (Z to A)</MenuItem>
              <MenuItem value="dateAsc">Date (Ascending)</MenuItem>
              <MenuItem value="dateDesc">Date (Descending)</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

SearchShows.propTypes = {
  shows: PropTypes.array,
  onSearchResults: PropTypes.func,
};

export default SearchShows;