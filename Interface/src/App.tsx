import './App.css';
import {Outlet} from "react-router-dom";
import {useState} from "react";

function App() {

    const [darkTheme, setDarkTheme] = useState<boolean>(false);

    const toggleDarkTheme = () => {
        document.documentElement.classList.toggle("dark")
        const bodyColor = document.querySelector("body");
        setDarkTheme(!darkTheme);
        if (bodyColor) {
            if (darkTheme) {
                bodyColor.style.backgroundColor = "#F9F9F9";
            } else {
                bodyColor.style.backgroundColor = "rgb(12 23 42)";
            }
        }
    };

    return (
        <div className="flex">

                <Outlet/>

            <div className="">
                <button className="w-28 h-28" onClick={() => toggleDarkTheme()}>

                    <img className="w-8" src={darkTheme ? "/icons8-sun (1).svg" : "/icons8-moon-50.png"}
                         alt={"theme button"}/>
                </button>
            </div>
        </div>
    );
}

export default App;
