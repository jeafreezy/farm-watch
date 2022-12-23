export function Spinner({ text }: { text: string }) {
    return (
        <>
            <div className="h-2 w-2  animate-spin bg-white"></div>
            <span> {text} </span>
        </>
    );
}
