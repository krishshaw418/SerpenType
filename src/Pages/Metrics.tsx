// import PerformanceMetrics from "../components/PerformanceMetrics";
import { useContext } from "react";
import { MetricsContext } from "@/context/MetricsStateContext";
function Metrics() {
  const metricState = useContext(MetricsContext);
  return (
    <div className="flex justify-center items-center h-150">
        {/* <PerformanceMetrics/> */}
        <h2>RAW: {metricState?.raw}</h2>
        <h2>WPM: {metricState?.wpm}</h2>
        <h2>Accuracy: {metricState?.accuracy} %</h2>
        <h2>Total Characters typed: {metricState?.characterCount}</h2>
        <h2>Correct Characters typed: {metricState?.correctCharCount}</h2>
        <h2>Incorrect Characters typed: {metricState?.incorrectCharCount}</h2>
    </div>
  )
}

export default Metrics