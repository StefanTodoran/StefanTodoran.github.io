import "./styles/IconButton.sass";

interface Props {
    href?: string,
    onClick?: () => void,
    src: string,
    label: string,
    target?: "_blank",
    overrideSize?: string,
}

export default function IconButton({
    href,
    onClick,
    src,
    label,
    target,
    overrideSize,
}: Props) {
    return (
        <a
            href={href}
            onClick={onClick}
            target={target}
            className="icon-button clickable"
            style={overrideSize ? { "--btn-size": overrideSize } : {}}
            tabIndex={0}
            onKeyDown={(evt: any) => { // TODO: Figure out the correct event type for this silly thing...
                if (onClick && evt.code === "Enter") onClick();
            }}
        >
            <img src={src} />
            <p className="label">{label}</p>
        </a>
    );
}