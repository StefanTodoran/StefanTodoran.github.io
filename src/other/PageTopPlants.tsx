import PlantDecoration from "../components/PlantDecoration";

import GraySideVine from "../assets/svg/gray-side-vine.svg";
import GrayHangingVine from "../assets/svg/gray-hanging-vine.svg";
import MiscPlants from "../assets/svg/misc-plants.svg";
import HangingVine from "../assets/svg/hanging-vine.svg";
import HangingVine2 from "../assets/svg/hanging-vine-2.svg";
import RopeVine from "../assets/svg/rope-vine.svg";

export default function PageTopPlants() {
    return (
        <>
            <PlantDecoration src={GraySideVine} top left long maxWidth="22.5vmin" />
            <PlantDecoration src={MiscPlants} top left long id="plant-1"
                customClass="affected-by-wind horizontal-sway"
                customStyle={{ "--translation-multiplier": .5, "--start-offset": 1.25, }}
            />

            <PlantDecoration src={GrayHangingVine} top right="10vw" maxHeight="17.5vmin"
                customClass="affected-by-wind"
                customStyle={{ "--translation-multiplier": 1.65, "--start-offset": 2, "--weight-multiplier": 0.5 }}
            />
            <PlantDecoration src={HangingVine2} top id="vine-1"
                customClass="affected-by-wind"
                customStyle={{ "--translation-multiplier": 1.4, "--start-offset": 1.5, }}
            />
            <PlantDecoration src={RopeVine} top right="15vw" desktopOnly
                customClass="affected-by-wind"
                customStyle={{ "--translation-multiplier": 0.8, "--start-offset": 0, }}
            />
            <PlantDecoration src={HangingVine} top right long
                customClass="affected-by-wind"
                customStyle={{ "--translation-multiplier": 1.85, "--start-offset": .75, "--weight-multiplier": 0.5 }}
            />
        </>
    );
}