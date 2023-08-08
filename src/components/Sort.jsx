import React from "react";
import { GENRES } from "../utilities/genres";

const Sort = ({ title, sortHandler, filterHandler }) => {
    const [sort, setSort] = React.useState("all");
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [filter, setFilter] = React.useState("");

    function formHandler(event) {
        event.preventDefault();
    }

    function activeSort(event) {
        setSort(event.target.name);
        sortHandler(event.target.name);
    }

    function activeFilter(event) {
        filterHandler(event.target.name);
        setFilter(event.target.name);
    }

    const sortBtnClassName = (btnName) =>
        sort === btnName ? "sort-btn active" : "sort-btn";

    return (
        <div className="browse--filters">
            <form className="filter--form" onSubmit={formHandler}>
                <h3>{title}</h3>

                <div className="sort-btn-container">
                    <div className="sort-list" onClick={activeSort}>
                        <button className={sortBtnClassName("all")} name="all">
                            All
                        </button>
                        <button className={sortBtnClassName("a-z")} name="a-z">
                            A-Z
                        </button>
                        <button className={sortBtnClassName("z-a")} name="z-a">
                            Z-A
                        </button>
                        <button
                            className={sortBtnClassName("most-recent")}
                            name="most-recent"
                        >
                            Most Recent
                        </button>
                        <button
                            className={sortBtnClassName("least-recent")}
                            name="least-recent"
                        >
                            Least Recent
                        </button>
                    </div>
                </div>

                <button
                    className="filters--btn"
                    type="button"
                    onClick={() => setFilterOpen((prev) => !prev)}
                >
                    filters
                </button>

                <dialog className="filter--dialog" open={filterOpen}>
                    <ion-icon
                        name="close-outline"
                        onClick={() => setFilterOpen((prev) => !prev)}
                    ></ion-icon>
                    <h3>These are the available genres:</h3>
                    <div className="filter-btns" onClick={activeFilter}>
                        {GENRES.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setFilterOpen((prev) => !prev)}
                                name={index + 1}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </dialog>

                <div className={filterOpen ? "overlay show" : "overlay"}></div>
            </form>
        </div>
    );
};

export default Sort;
