interface Props {
    id?: string,
    children?: React.ReactNode,
}

export default function SectionBreak({
    id,
    children,
}: Props) {
    return (
        <div className="section-break" id={id}>
            {children}
        </div>
    );
}