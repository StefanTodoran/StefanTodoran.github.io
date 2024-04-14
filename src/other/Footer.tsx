import { useEffect, useState } from "react";
import PlantDecoration from "../components/PlantDecoration";

import LeafLogo from "../assets/leaf-logo.png";
import Bamboo from "../assets/svg/bamboo.svg";
import Mushrooms from "../assets/svg/mushrooms.svg";
import Cattail from "../assets/svg/cattail.svg";
import Shrubs from "../assets/svg/shrubs.svg";
import Shrubs3 from "../assets/svg/shrubs-3.svg";
import Shrubs4 from "../assets/svg/shrubs-4.svg";

/**
 * @param owner String github username of the target repo owner.
 * @param repo String repo name of the target repo.
 * @returns {Date} A date object representing the most recent commit in the repo,
 * or null if there was an issue getting the most recent commit time.
 */
async function getLastCommitDate(owner: string, repo: string) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!(data.length > 0)) {
            throw new Error("No commits found in the repository.");
        }

        const lastCommit = data[0];
        const commitDate = new Date(lastCommit.commit.author.date);
        return commitDate;
    }
    catch (error: any) {
        console.error("Error retrieving commit data:", error.message);
    }

    return null;
}

export default function Footer() {
    const [lastUpdated, setLastUpdated] = useState("8/29/2023");

    useEffect(() => {
        getLastCommitDate("StefanTodoran", "StefanTodoran.github.io").then((commitDate: Date | null) => {
            if (!commitDate) return;
            const displayDate = commitDate.toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
            });
            setLastUpdated(displayDate);
        });
    }, []);

    return (
        <section id="footer" className="container">
            <div className="hr"></div>
            <div className="footer-row">
                Last updated <span id="last-updated">{lastUpdated}</span>
                <img id="leaf-logo" src={LeafLogo} />
            </div>

            <div className="footer-row">
                &copy; Stefan Todoran
            </div>

            <PlantDecoration src={Bamboo} bottom left="30vw" maxWidth="20vmin" />
            <PlantDecoration src={Mushrooms} bottom right="35vw" />
            <PlantDecoration src={Shrubs3} top right long />
            <PlantDecoration src={Shrubs4} left long bottom="12.5vmin" maxWidth="15vmin" customClass="tiny-width-fix" />
            <PlantDecoration src={Cattail} bottom left long />
            <PlantDecoration src={Shrubs} bottom right long />
        </section>
    );
}