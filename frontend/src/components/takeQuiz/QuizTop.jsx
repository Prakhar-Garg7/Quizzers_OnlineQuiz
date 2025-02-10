export default function QuizTop(props) {
    // console.log("props: ", props)
    const {title, timeLeft} = props
    return (
        <div className="h-auto py-3 px-7 flex justify-between bg-green-600">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <div>
                <span className="text-lg font-semibold text-white">Remaining time: </span>
                <span className="text-xl bg-white text-black rounded-sm p-1">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
            </div>
        </div>
    )
}