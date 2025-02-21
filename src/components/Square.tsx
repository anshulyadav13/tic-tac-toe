export const Square = (
    {
        value,
        onClick
    }: { value: string, onClick: () => void }) => {

    return (
        <>
            <div className="font-sans font-medium cursor-pointer bg-slate-500 w-10 h-10 text-center p-2 rounded-sm text-white" onClick={onClick}>
                {value}
            </div>
        </>
    )
}