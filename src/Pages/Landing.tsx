import WordsDisplayArea from "../components/WordsDisplayArea";
import Toolbar from "@/components/Toolbar";
function Landing() {
  return (
    <div className="relative">
      <div className="absolute z-10 top-[50px] left-1/2 transform -translate-x-1/2 w-[400px] bg-accent text-accent-foreground dark:bg-accent/50 rounded-2xl">
        <Toolbar/>
      </div>
      <div className="flex flex-col z-0">
        <WordsDisplayArea/>
      </div>
    </div>
  )
}

export default Landing