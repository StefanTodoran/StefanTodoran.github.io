import "./styles/SimpleButton.sass";

interface Props {
    svg?: React.ReactNode,
    label?: string,
    onClick: () => void,
    primary?: boolean,
}

export default function SimpleButton({ svg, label, onClick, primary }: Props) {
    let className = "simple-button";
    if (primary) className += " primary";

    return (
        <button onClick={onClick} className={className}>
            {label}
            {svg}
        </button>
    );
}