import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [233.89, 1.89, 156, 145, 2.8, 31.98, 199, 248.98] }];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '38%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'EU',
        'Japan',
        'Canada',
        'Austraila',
        'Singapore',
        'India',
        'China',
        'United States',
        'United Kingdom'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Conversion Rates TO Sri Lanakan Rupees" subheader="(+43%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
