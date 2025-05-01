import { Button } from "./ui/button"
import MailIcon from "../assets/mail_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
import CodeIcon from "../assets/folder_code_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
// import CopyRightIcon from "../assets/copyright_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
function Footer() {
  return (
    <div className="flex py-3 items-center absolute bottom-0 right-0">
      {/* <div>
      <img src={CopyRightIcon} alt="copyright icon" className="w-[20px] h-[20px]"/>
      </div> */}
        <Button variant="link">
            <img src={MailIcon} alt="mail icon" className="invert-0 dark:invert"/>
            <a href="#">contact</a>
        </Button>
        <Button variant="link">
            <img src={CodeIcon} alt="code icon" className="invert-0 dark:invert"/>
            <a href="#">github</a>
        </Button>
    </div>
  )
}
export default Footer