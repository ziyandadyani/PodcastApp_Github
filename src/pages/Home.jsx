import React from "react";
import Banner from "../components/Banner.jsx";
import PreviewDisplay from "../components/PreviewDisplay.jsx";
//import Favourites from "../pages/Favorites.jsx"
// import supabase from "../config/supabaseClient.js";

function Home() {
    return (
        <div>
            <Banner />
            {/* <PreviewDisplay key="1" title="Recently Played" size="small" /> */}
            <PreviewDisplay
                key="2"
                size="small"
                title="You May Like:"
            />
            <PreviewDisplay key="3" title="Browse" />
        </div>
    );
}

export default Home;
