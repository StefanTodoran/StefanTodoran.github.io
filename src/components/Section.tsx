import "./styles/Section.sass";

interface Props {
    id?: string,
    plantDecorations?: React.ReactNode,
    branchSrc: string,
    parallaxContent: React.ReactNode,
    children: React.ReactNode,
    inverse?: boolean,
}

export default function Section({
    id,
    plantDecorations,
    branchSrc,
    parallaxContent,
    children, // anchorContent
    inverse,
}: Props) {

    let anchorClassName = "parallax-anchor dynamic-item";
    if (inverse) anchorClassName += " inverse";

    return (
        <section id={id} className="parallax-section">
            {plantDecorations}
            {inverse && parallaxContent}

            <img
                src={branchSrc}
                className={inverse ? "branch-decoration inverse" : "branch-decoration"}
            />
            <div className={anchorClassName}>
                {children}
            </div>

            {!inverse && parallaxContent}
        </section>
    );
}