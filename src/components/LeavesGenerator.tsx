import { useEffect } from "react";
import { random, linkedRandom } from "../utils/utils.ts";

import Leaf from "../assets/svg/leaf.svg";
import "./styles/FallingLeaf.sass";

interface Props {
    leafCount: number,
    spawnDelay: [number, number],
    gustFrequency: [number, number],
}

function setLeafPropertiesRandomly(leaf: HTMLElement, minDuration: number, maxDuration: number) {
    const linkedValues = linkedRandom([
        [minDuration * 1000, maxDuration * 1000], // --duration constraint
        [0, 2500], // --spin-speed constraints
        [0.75, 1], // --height-multiplier constraints
        [0, 5], // --sway-multiplier constraints
    ]);
    
    leaf.style.setProperty("--duration", `${linkedValues[0]}ms`);
    leaf.style.setProperty("--spin-speed", `${3000 - linkedValues[1]}ms`);
    leaf.style.setProperty("--height-multiplier", "" + linkedValues[2]);
    // leaf.style.setProperty("--sway-multiplier", 5 - linkedValues[3] + "");
    
    let rotation = random(0, 2) ** 2;
    if (Math.random() > 0.5) rotation *= -1;
    leaf.style.setProperty("--rotate-amount", `${rotation}turn`);

    leaf.style.setProperty("--position", `${random(5, 95)}vw`);
    leaf.style.setProperty("--delay", `${random(0, maxDuration * 1000)}ms`);
}

export default function LeavesGenerator({ leafCount, spawnDelay }: Props) {
    const leaves = [];
    const ids: string[] = [];

    for (let i = 0; i < leafCount; i++) {
        const id = `falling-leaf-${i}`;
        ids.push(id);
        leaves.push(
            <img
                key={i}
                src={Leaf}
                id={id}
                className="falling-decoration"
            />
        );
    }

    useEffect(() => {
        function updateLeaf(evt: AnimationEvent, leaf: HTMLElement) {
            // This should never be the case, because of the other two animations
            // on the element one is infinite and the other is longer, but just in case.
            if (evt.animationName !== "fade-and-turn") return;

            setLeafPropertiesRandomly(leaf, spawnDelay[0], spawnDelay[1]);
            // if (!leaf.classList.contains("blown")) leaf.classList.remove("wind-gust", "blown");
            
            leaf.classList.add("animation-restart");
            leaf.offsetTop; // Accessing this to trigger DOM reflow and restart animation.
            leaf.classList.remove("animation-restart");
            leaf.classList.remove("smooth-removal");
        }

        const leafElements: HTMLElement[] = [];
        ids.forEach((id, idx) => {
            const leaf = document.getElementById(id)!;
            leafElements.push(leaf);
            
            // setLeafPropertiesRandomly(leaf, spawnDelay[0], spawnDelay[1]);
            // We do this on first call because otherwise the leaves are somewhat synchronized.
            setTimeout(() => setLeafPropertiesRandomly(leaf, spawnDelay[0], spawnDelay[1]), idx * 1000);
            leaf.addEventListener("animationend", (evt) => updateLeaf(evt, leaf));
        });

        // const plantDecorations = document.querySelectorAll(".affected-by-wind") as NodeListOf<HTMLElement>;
        // function doWindGust() {    
        //     setTimeout(() => {
        //         plantDecorations.forEach(decoration => {
        //             decoration.classList.remove("single-wind-gust", "double-wind-gust");
        //             decoration.offsetTop; // Accessing this to trigger DOM reflow and restart animation.
                    
        //             decoration.classList.add("single-wind-gust");
        //         });
                
        //         leafElements.forEach(leaf => {
        //             leaf.classList.add("wind-gust");
        //             leaf.style.setProperty("--gust-strength", "20");
        //         });
                
        //     }, random(...gustFrequency) * 1000);
        // }
        
        // plantDecorations[0].addEventListener("animationend", () => {
        //     leafElements.forEach(leaf => {
        //         leaf.classList.add("blown");
        //         leaf.style.setProperty("--gust-strength", "1");
        //     });
        //     doWindGust();
        // });
        // doWindGust();
    }, []);

    return (<>{leaves}</>);
}