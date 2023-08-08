import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Show from "./pages/Show.jsx";
import Favorites from "./pages/Favorites.jsx";

function App() {
    const [state, setState] = React.useState({
        isPlaying: false,
        episode: {},
    });

    function playEp(episode) {
        setState((prev) => {
            return {
                ...prev,
                episode: episode,
                isPlaying: true,
            };
        });
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout state={state} />}>
                    <Route index element={<Home />} />
                    <Route
                        path="show/:id"
                        element={<Show playEpHandler={playEp} />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="favorites" element={<Favorites />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
