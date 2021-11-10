import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../charts';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import React,{useState} from 'react';

// ----------------------------------------------------------------------


export default function LineChart({title,CHART_DATA,labels,subheader,url}) {
  const [data,setData] =  useState()
  const [chartData,setChartData] = useState(CHART_DATA)
  // console.log(chartData)
  const [label, setLabel] = useState(labels)
  const token = localStorage.getItem('adminToken')

    const formik = useFormik({
        initialValues: {
          //id:'',
          startDate: '',
          endDate: ''
        },
        
        onSubmit: (values) => {
          const CHARTDATA = [
            {
              name: 'Delivered',
              type: 'line',
              // column
              data: []
            },
            {
              name: 'Total',
              type: 'line',
              // area
              data: []
            },
            {
              name: 'Cancelled',
              type: 'line',
              data: []
            }
          ]
          const Labels = []
          fetch(process.env.REACT_APP_API_HOST+url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
            body: JSON.stringify( values)
            // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
          })
          .then(result=>{
            // if(result.status===200){
            //   navigate('/app', { replace: true });
            // }
            // console.log(result.status)
            return result.json()
          })
          .then(data=>{
            setData(data)
          })
          
          data && data.map((count,i)=>{
            CHARTDATA[0].data.push(count.deliveredcount)
            CHARTDATA[1].data.push(count.totalcount)
            CHARTDATA[2].data.push(count.cancelledcount)
            Labels.push(count.date)
          })
          setChartData(CHARTDATA)
          setLabel(Labels)
        }
      });
      
      const { errors, touched, isSubmitting, handleSubmit, getFieldProps,setFieldValue } = formik;
      // data && data.map((count,i)=>{
      //   CHART_DATA[0].data.push(count.deliveredcount)
      //   CHART_DATA[1].data.push(count.totalcount)
      //   CHART_DATA[2].data.push(count.cancelledcount)
      //   labels.push(count.date)
      // })
      // console.log(data)

  const chartOptions = merge(BaseOptionChart(), {
    // stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: label.length>0?label : labels,
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
      <FormikProvider value={formik}>
        <Form autoComplete="on"  onSubmit={handleSubmit}>
      <TextField
        id="date"
        label="From"
        type="date"
        {...getFieldProps('startDate')}
        defaultValue= "2021-09-27"
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
        {...getFieldProps('endDate')}
        defaultValue="2021-09-27"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{margin:'5px'}}
      />
      <LoadingButton
          
          style={{width:'30%',margin:'10px'}}
          size="large"
          type="submit"
          variant="contained"
        //   loading={isSubmitting}
        >
          Filter
        </LoadingButton>
      </Form>
    </FormikProvider>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData[0].data.length>0?chartData:CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
