import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InputField from "./components/InputField";
export default function App(){
    return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <InputField/>
            <Footer/>
        </div>
    </ThemeProvider>
    )
}