import "./styles/Loader.sass";
import LoaderSplash from "../assets/svg/loader.svg";

export default function Loader() {
    return (
        <div id="loader-container">
            <img src={LoaderSplash} id="loader" />
        </div>
    );
}