import "./styles/Title.sass";

interface Props {
    href?: string,
    mobile?: string,
    children: string,
    customClass?: string,
    target?: "_blank",
}

export default function Title({
    href,
    mobile,
    children,
    customClass,
    target,
}: Props) {
    let className = "title";
    if (href) className += " clickable";
    if (customClass) className += " " + customClass;

    return (
        <>
            <a
                href={href}
                className={className + (mobile ? " long-version" : "")}
                target={target}
            >
                {children}
            </a>
            
            {mobile && <a href={href} className={className + " short-version"}>{mobile}</a>}
        </>
    );
}