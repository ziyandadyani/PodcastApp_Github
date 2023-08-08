import React from "react";
import Sort from "./Sort.jsx";
import Preview from "./Preview.jsx";
import { GENRES } from "../utilities/genres.js";
const SHOWS_API = "https://podcast-api.netlify.app/shows";

const PreviewDisplay = ({ title, size }) => {
    const [state, setState] = React.useState({
        isLoading: true,
        shows: "",
        sortShows: "all",
        filterShows: "all",
        apidata: {},
    });

    function sortShows(sort) {
        let resortedShows = [];

        if (sort === "all") {
            resortedShows = state.apidata;
        } else if (sort === "a-z") {
            resortedShows = state.shows.toSorted((a, b) => {
                return a.title.localeCompare(b.title);
            });
        } else if (sort === "z-a") {
            resortedShows = state.shows.toSorted((a, b) => {
                return b.title.localeCompare(a.title);
            });
        } else if (sort === "most-recent") {
            resortedShows = state.shows.toSorted((a, b) => {
                const aUpdated = new Date(a.updated);
                const bUpdated = new Date(b.updated);
                return bUpdated.getTime() - aUpdated.getTime();
            });
        } else if (sort === "least-recent") {
            resortedShows = state.shows.toSorted((a, b) => {
                const aUpdated = new Date(a.updated);
                const bUpdated = new Date(b.updated);
                return aUpdated.getTime() - bUpdated.getTime();
            });
        }

        setState((prev) => {
            return {
                ...prev,
                shows: resortedShows,
                sortShows: sort,
            };
        });
    }

    function filterShows(filter) {
        const filteredShows = state.apidata.filter((show) =>
            show.genres.includes(parseInt(filter))
        );

        setState((prev) => {
            return {
                ...prev,
                filterShows: filter,
                shows: filteredShows,
            };
        });
    }

    React.useEffect(() => {
        fetch(SHOWS_API)
            .then((res) => res.json())
            .then((data) => {
                setState((prev) => {
                    return {
                        ...prev,
                        isLoading: false,
                        shows: data,
                        apidata: data,
                    };
                });
            });
    }, []);

    const addTitle =
        title === "Browse" ? (
            <Sort
                title="Browse"
                sortHandler={sortShows}
                filterHandler={filterShows}
            />
        ) : (
            <h3 className="small--preview-display-title">{title}</h3>
        );
    const type = size ? `${size}--preview` : "preview";

    return (
        <section>
            {state.isLoading && <div>Loading...</div>}
            {state.shows && (
                <>
                    {addTitle}
                    <div className={type + "-display"}>
                        {state.shows.map((show) => (
                            <Preview key={show.id} data={show} />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default PreviewDisplay;
