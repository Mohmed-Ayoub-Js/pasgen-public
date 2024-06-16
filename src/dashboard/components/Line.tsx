import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];
export default function LineCharts() {
  return (
    <Card>
        <CardHeader>
          <p>
            تحليل البيانات
          </p>
        </CardHeader>
        <CardContent className=' flex justify-center items-center flex-col'>
        <ChartContainer
      width={500}
      height={300}
      series={[{ data: uData, label: 'uv', type: 'bar' }]}
      xAxis={[{ scaleType: 'band', data: xLabels }]}
    >
      <BarPlot />
    </ChartContainer>
        </CardContent>
    </Card>
  );
}
