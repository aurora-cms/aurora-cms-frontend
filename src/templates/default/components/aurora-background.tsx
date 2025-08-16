// Aurora animation component
export function AuroraBackground() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="aurora-container absolute inset-0">
                <div className="aurora-1"></div>
                <div className="aurora-2"></div>
                <div className="aurora-3"></div>
                <div className="aurora-4"></div>
            </div>
            {/* Overlay to make content more readable */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>
    );
}
