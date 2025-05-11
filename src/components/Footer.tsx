import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { ContactForm } from "./ContactForm";
import { Button } from "./ui/button"
import MailIcon from "../assets/mail_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
import CodeIcon from "../assets/folder_code_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
import CopyRightIcon from "../assets/copyright_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
function Footer() {
  return (
    <div>
      <div className="flex pl-4 py-5 items-center gap-1.5 justify-center absolute bottom-0">
        <img src={CopyRightIcon} alt="copyright icon" className="invert-0 dark:invert"/>
        <h6 className="text-sm font-semibold">copyright 2025</h6>
      </div>
    <div className="flex py-3 items-center absolute bottom-0 right-0">
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">
            <img src={MailIcon} alt="mail icon" className="invert-0 dark:invert"/>
            contact
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
            Fill out the form below and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
        <Button variant="link">
            <img src={CodeIcon} alt="code icon" className="invert-0 dark:invert"/>
            <a href="https://github.com/krishshaw418/SerpenType.git">github</a>
        </Button>
    </div>
    </div>
  )
}
export default Footer