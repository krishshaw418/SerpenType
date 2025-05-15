import WordsDisplayArea from "../components/WordsDisplayArea";
import Timer from "../components/Timer";
// import { TimerProvider } from '../context/TimerContext'


function Landing() {
  return (
    <div className="flex flex-col">
            <WordsDisplayArea/>
            <Timer/>
    </div>
  )
}

export default Landing