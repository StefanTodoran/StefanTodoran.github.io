import { useEffect, useRef } from "react";
import { isBrowserFirefox } from "../utils/utils";
import "./styles/Carousel.sass";

interface Props {
    plantDecorations: React.ReactNode,
    children: React.ReactNode,
    label: string,
    tip?: string,
}

export default function Carousel({
    plantDecorations,
    children,
    label,
    tip,
}: Props) {
    const containerRef = useRef<HTMLElement>(null);

    function triggerReflow() {
        containerRef.current!.style.display = "none";
        // Force restyle by accessing some property
        void containerRef.current!.offsetWidth;
        containerRef.current!.style.display = "";
    }

    useEffect(() => {
        // Chromium actually renders CSS animations properly so we don't need to trigger
        // reflow to fix the animation when the viewport width changes.
        if (!isBrowserFirefox()) return;

        let debounceTimeoutId: number;
        function debounceEventHandler(evt: any, func: (evt: any) => void, delay: number) {
            clearTimeout(debounceTimeoutId);
            debounceTimeoutId = window.setTimeout(() => func(evt), delay);
        }

        const debouncedHandleResize = (evt: any) => { debounceEventHandler(evt, triggerReflow, 500) };
        window.addEventListener("resize", debouncedHandleResize);

        return () => {
            // Cleanup the event listener when the component unmounts
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, []);

    return (
        <section className="container" ref={containerRef}>
            {plantDecorations}

            <div className="row">
                <div className="hr"></div>
                <div className="subtitle">{label}</div>
                <div className="hr"></div>
            </div>

            <div className="carousel row">
                {children}
            </div>
            <div className="hr"></div>
            
            {tip && <p className="client-tip" style={{ marginTop: "-2em" }}>{tip}</p>}
        </section>
    );
}