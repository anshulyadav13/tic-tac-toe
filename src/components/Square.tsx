type SquareProps = {
    value: string;
    onClick: () => void;
    highlight?: boolean;
};

export const Square = ({ value, onClick, highlight = false }: SquareProps) => {
    // Add a conditional style for the winning cell
    const baseStyle = "cursor-pointer bg-slate-500 w-15 h-15 flex items-center justify-center rounded-sm";
    const highlightStyle = highlight ? "bg-yellow-400" : "";

    return (
        <div className={`${baseStyle} ${highlightStyle}`} onClick={onClick}>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
};
