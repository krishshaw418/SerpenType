import {Routes, Route} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./Pages/Landing";
import Metrics from "./Pages/Metrics";
import { TimerProvider } from "./context/TimerContext";
export default function App(){
    return (
    <div className="min-h-screen">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TimerProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/metrics" element={<Metrics/>}/>
                </Routes>
            <Footer/>
            </TimerProvider>
        </ThemeProvider>
    </div>
    )
}