interface BaseProps {
    id?: string,
    src: string,
    top?: boolean | number | string,
    right?: boolean | number | string,
    bottom?: boolean | number | string,
    left?: boolean | number | string,
    long?: boolean,
    maxWidth?: string,
    maxHeight?: string,
    desktopOnly?: boolean,
    customClass?: string,
    customStyle?: React.CSSProperties,
}

interface StaticProps extends BaseProps {
    hoverSrc?: undefined,
    onClick?: undefined,
}

interface ClickableProps extends BaseProps {
    // hoverSrc: string,
    onClick: () => void,
}

type Props = StaticProps | ClickableProps;

export default function PlantDecoration({
    id,
    src,
    top,
    left,
    right,
    bottom,
    long,
    maxWidth,
    maxHeight,
    desktopOnly,
    customClass,
    customStyle,
    onClick,
}: Props) {
    let className = "plant-decoration";
    if (long) className += " long";
    if (desktopOnly) className += " long-version";
    if (onClick) className += " clickable";
    if (customClass) className += " " + customClass;

    const _top = (typeof top === "boolean") ? 0 : top;
    const _right = (typeof right === "boolean") ? 0 : right;
    const _bottom = (typeof bottom === "boolean") ? 0 : bottom;
    const _left = (typeof left === "boolean") ? 0 : left;

    return <img
        id={id}
        src={src}
        className={className}
        onClick={onClick}
        style={{
            top: _top,
            right: _right,
            bottom: _bottom,
            left: _left,

            maxWidth: maxWidth,
            maxHeight: maxHeight,
            ...customStyle,
        }}
    />;
}