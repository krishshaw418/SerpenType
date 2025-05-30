import { LineChart } from '@mui/x-charts/LineChart';
import { useContext } from 'react';
import { MetricsContext } from '@/context/MetricsStateContext';
import { TimerContext } from '@/context/TimerStateContext';
import { useTheme } from './theme-provider';
export default function GridDemo() {
  const theme = useTheme();
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
    <div className={`p-4 rounded-lg ${theme.theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'} transition-colors`}>
      <LineChart
      xAxis={[{ data: xAxisData, label: 'Time (s)' }]}
      yAxis={[{ label: 'Words Per Minute' }]}
      series={[
        {
          label: 'WPM',
          curve: 'catmullRom',
          data: wpmArray,
          color: theme.theme === 'light' ? '#F44336' : '#4CAF50', // optional: green
        },
        {
          label: 'Raw WPM',
          curve: 'catmullRom',
          data: rawArray,
          color: theme.theme === 'light' ? '#4CAF50' : '#F44336', // optional: red
        },
      ]}
      height={250}
      width={1300}
      grid={{ vertical: true, horizontal: true }}
      className='dark:invert-100'
      axisHighlight = {{ x: 'line' }}
      sx={{
        '.MuiChartsLegend-root': {
          color: theme.theme === 'dark' ? '#fff' : '#000', // Legend label color
          },
      }}
    />
    </div>
  );
}