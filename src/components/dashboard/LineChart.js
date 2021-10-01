import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../charts';
import TextField from '@material-ui/core/TextField';
// ----------------------------------------------------------------------


export default function LineChart({title,CHART_DATA,labels,subheader}) {
  const chartOptions = merge(BaseOptionChart(), {
    // stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: labels,
    xaxis: {type:'datetime',title:{text:'Date'}},
    yaxis: {title:{text:'Count'}},
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} `;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <form  noValidate>
      <TextField
        id="date"
        label="From"
        type="date"
        defaultValue="2021-09-27"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{margin:'5px'}}
      />
      <TextField
        id="date"
        label="To"
        type="date"
        defaultValue="2021-09-27"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{margin:'5px'}}
      />
    </form>

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
