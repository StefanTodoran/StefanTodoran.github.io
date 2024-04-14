import "./styles/ClientIcon.sass";

interface Props {
    src: string,
    href: string,
    order: number,
    mobileSrc?: string,
}

export default function ClientIcon({
    src,
    href,
    order,
    mobileSrc,
}: Props) {
    return (
        <a
            target="_blank"
            className="client-icon"
            style={{ "--order": order }}
            href={href}
        >
            <img className={mobileSrc ? "long-version" : ""} src={src} />
            {mobileSrc && <img className="short-version" src={mobileSrc} />}
        </a>
    );
}