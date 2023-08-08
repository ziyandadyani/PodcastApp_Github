import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    const [showMore, setShowMore] = React.useState(false);

    function toggleMenu() {
        setShowMore((showMore) => !showMore);
    }

    return (
        <>
            <div
                onClick={toggleMenu}
                className={showMore ? "menu-btn close" : "menu-btn"}
            >
                <div className="btn-line"></div>
                <div className="btn-line"></div>
                <div className="btn-line"></div>
            </div>
            <nav className={showMore ? "menu show" : "menu"}>
                <ul className={showMore ? "menu-nav show" : "menu-nav"}>
                    <li className="account">
                        <div className="account--user">
                            <h2 className="user">
                                <ion-icon name="person-circle-outline"></ion-icon>
                                Guest
                            </h2>
                            <Link to="login">
                                <button className="li--btn">
                                    Login/Register
                                </button>
                            </Link>
                        </div>

                        <p>
                            Create an account by signing up gain access of
                            certain feathers
                        </p>
                    </li>
                    <li className="nav-item">
                        <ion-icon name="sunny-outline"></ion-icon>
                        <h4>Appearence</h4>
                    </li>
                    <li>
                        <Link to="/favorites" className="nav-item">
                            <ion-icon name="bookmark-outline"></ion-icon>
                            <h4>Favirotes</h4>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={showMore ? "overlay show" : "overlay"}></div>
        </>
    );
};

export default Menu;
