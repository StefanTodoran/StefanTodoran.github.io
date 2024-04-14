interface Props {
    size: string,
}

export default function SubmitIcon({ size }: Props) {
    return (
        <svg width={size} height={size} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="submit">
                <path id="Vector" d="M144.397 75.0832L96.3138 27L85 38.3138L121.77 75.0832L85 111.853L96.3138 123.167L144.397 75.0832Z" fill="white" />
                <path id="Vector_2" d="M104.397 75.0832L56.3138 27L45 38.3138L81.7696 75.0832L45 111.853L56.3138 123.167L104.397 75.0832Z" fill="white" />
                <path id="Vector_3" d="M64.397 75.0832L16.3138 27L5 38.3138L41.7696 75.0832L5 111.853L16.3138 123.167L64.397 75.0832Z" fill="white" />
            </g>
        </svg>
    );
}

