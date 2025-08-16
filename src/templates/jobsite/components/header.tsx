type HeaderProps = {
    image?: string;
    video?: string;
}

export function Header({image, video}: HeaderProps) {
    return (
        <header className="relative w-full h-screen bg-gray-200">
            {video ? (
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={video}
                    autoPlay
                    loop
                    muted
                />
            ) : image ? (
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={image}
                    alt="Header background"
                />
            ) : null}
            <div className="absolute inset-0 bg-black opacity-20" />
            <div className="relative z-10 flex items-center justify-center h-full text-white text-3xl text-shadow-2xl font-bold">
                Jobsite Header
            </div>
        </header>
    );

}