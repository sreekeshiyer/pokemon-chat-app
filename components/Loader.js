export default function Loader() {
    let circleCommonClasses = "h-5 w-5 bg-blue-500 rounded-full";

    return (
        <div className="absolute inset-y-0 right-0 flex backdrop-blur-sm items-center justify-center w-full h-full">
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
}
