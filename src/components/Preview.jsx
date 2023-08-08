import React from "react";
import { Link } from "react-router-dom";
import getdate from "../utilities/get.date.js";
import { GENRES } from "../utilities/genres.js";

const Preview = ({ data }) => {
    const date = new Date(data.updated);
    const updatedDate = getdate(date);
    const genre = data.genres.map((item) => GENRES[item - 1]);

    return (
        <Link to={`show/${data.id}`} state={data}>
            <div className="preview">
                <img src={data.image} className="preview--image" />
                <p className="preview--title">{data.title}</p>
                <div className="preview--details">
                    <p>Seasons: {data.seasons}</p>
                    <p>last updated: {updatedDate}</p>
                    <p>genres: {genre}</p>
                </div>
            </div>
        </Link>
    );
};

export default Preview;
