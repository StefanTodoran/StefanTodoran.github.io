import "./styles/ClientIcon.sass";

interface Props {
    id?: string,
    src: string,
    href: string,
    order: number,
    mobileSrc?: string,
    pixelArt?: boolean,
    extraPadding?: number,
}

export default function ClientIcon({
    id,
    src,
    href,
    order,
    mobileSrc,
    pixelArt,
    extraPadding,
}: Props) {
    let className = "client-icon";
    if (pixelArt) className += " pixel-art";
    if (extraPadding) className += " extra-padding";

    return (
        <a
            id={id}
            target="_blank"
            className={className}
            style={{ "--order": order, "--pad": "" + extraPadding }}
            href={href}
        >
            <img className={mobileSrc ? "long-version" : ""} src={src} />
            {mobileSrc && <img className="short-version" src={mobileSrc} />}
        </a>
    );
}