import { LineChart } from '@mui/x-charts/LineChart';
import { useContext } from 'react';
import { MetricsContext } from '@/context/MetricsStateContext';
import { TimerContext } from '@/context/TimerStateContext';
export default function GridDemo() {
  const metricsState = useContext(MetricsContext); // wpm and raw 
  const timerState = useContext(TimerContext); // The time to be on x-axis
  if (!metricsState || !timerState) {
    return <p>Loading chart data...</p>;
  }
  const wpmArray = metricsState.wpmPerSec;
  const rawArray = metricsState.rawPerSec;
  const length = Math.max(wpmArray.length, rawArray.length);
  const xAxisData = Array.from({ length }, (_, i) => i + 1);

  return (
    <LineChart
      xAxis={[{ data: xAxisData, label: 'Time (s)' }]}
      series={[
        {
          label: 'WPM',
          curve: 'catmullRom',
          data: wpmArray,
          color: '#4CAF50', // optional: green
        },
        {
          label: 'Raw WPM',
          curve: 'catmullRom',
          data: rawArray,
          color: '#F44336', // optional: red
        },
      ]}
      height={250}
      width={1300}
      grid={{ vertical: true, horizontal: true }}
      className='dark:invert-100'
      axisHighlight = {{ x: 'line' }}
    />
  );
}