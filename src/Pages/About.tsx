import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import infoIcon from "../assets/info_i_20dp_000000_FILL0_wght500_GRAD0_opsz20.png";

function About() {
  return (
    <div className="flex">
    <Dialog>
    <Tooltip>
        <TooltipTrigger asChild>
        <DialogTrigger asChild>
        <button>
        <img src={infoIcon} alt="info-icon" className="dark:invert flex"/>
        </button>
        </DialogTrigger>
    </TooltipTrigger>
    <TooltipContent>
        <p>About</p>
    </TooltipContent>
    </Tooltip>
    <DialogContent>
    <DialogHeader>
      <DialogTitle >Welcome To SerpenType</DialogTitle>
      <DialogDescription>
        Serpentype is a minimalistic, open-source typing test platform inspired by Monkeytype. Built for speed and simplicity, it offers a distraction-free typing experience for everyone — no accounts, no ads, and absolutely no data collection.

        Whether you're a developer, a writer, or just someone trying to improve your typing speed, Serpentype is designed to be fast, lightweight, and completely free to use.
        <h2 className="pt-2">Key features:</h2>
        <p>💻 Open to all.</p>
        <p>🔐 Privacy-first — we don't store or track anything.</p>
        <p>🌟 Like it? Give it a star on GitHub and help spread the word!</p>
        <p className="pt-2">Thank you for using SerpenType.</p>
      </DialogDescription>
    </DialogHeader>
    </DialogContent>
    </Dialog>
    </div>
  )
}

export default About