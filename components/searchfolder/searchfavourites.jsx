import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const SearchFavs = ({ favouriteData, onSearchResults }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    performSearch(e.target.value);
  };

  const performSearch = (sort) => {
    let results = favouriteData.slice();

    if (sort === "az") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      results.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "dateAsc") {
      results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sort === "dateDesc") {
      results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (!sort) {
      results = "";
    }

    onSearchResults(results);
  };

  return (
    <div className="my-4 mx-2">
      <FormControl sx={{ width: "45%", height: "30px" }}>
        <InputLabel sx={{ marginTop: "-7px" }}>Sort by</InputLabel>
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
  );
};

SearchFavs.propTypes = {
  favouriteData: PropTypes.array,
  onSearchResults: PropTypes.func,
};

export default SearchFavs;