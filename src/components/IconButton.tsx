import { logEvent } from "firebase/analytics";
import { analytics } from "../utils/firebase";
import "./styles/IconButton.sass";

interface Props {
    href?: string,
    onClick?: () => void,
    src: string,
    label: string,
    target?: "_blank",
    overrideSize?: string,
    analyticsEvent?: string,
}

export default function IconButton({
    href,
    onClick,
    src,
    label,
    target,
    overrideSize,
    analyticsEvent,
}: Props) {
    function handleClick() {
        if (!!onClick) onClick();
        if (analyticsEvent) logEvent(analytics, analyticsEvent);
    }

    return (
        <a
            href={href}
            onClick={handleClick}
            target={target}
            className="icon-button clickable"
            style={overrideSize ? { "--btn-size": overrideSize } : {}}
            tabIndex={0}
            onKeyDown={(evt: React.KeyboardEvent) => {
                if (evt.code === "Enter") handleClick();
            }}
        >
            <img src={src} />
            <p className="label">{label}</p>
        </a>
    );
}