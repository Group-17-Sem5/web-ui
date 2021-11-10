// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppCouriers,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppClerks,
  AppConversionRates
} from '../components/_dashboard/app';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useFetch from 'src/hooks/useFetch';
import LineChart from 'src/components/dashboard/LineChart';
import PieChart from 'src/components/dashboard/PieChart';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  var date = new Date();
  date.setDate(date.getDate() - 11);

  const ChartData = [
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
  const ChartDataPost = [
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
  const ChartDataMoneyorder = [
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
  const LabelsPost = []
  const LabelsMoneyorder = []
  const ChartPieDataCourier = []
  const ChartPieDataPost = []
  const ChartPieDataMoneyorder = []

  const {data:courierCount} = useFetch('/clerk/courier/count')
  const {data:postCount} = useFetch('/clerk/post/count')
  const {data:moneyorderrCount} = useFetch('/clerk/moneyorder/count')
  const {data:courierAllCount} = useFetch('/clerk/courier/allCount')
  const {data:postAllCount} = useFetch('/clerk/post/allCount')
  const {data:moneyorderAllCount} = useFetch('/clerk/moneyorder/allCount')

   courierCount.map((count,i)=>{
     ChartData[0].data.push(count.deliveredcount)
     ChartData[1].data.push(count.totalcount)
     ChartData[2].data.push(count.cancelledcount)
     Labels.push(count.date)
   })

  postCount.map((count,i)=>{
    ChartDataPost[0].data.push(count.deliveredcount)
    ChartDataPost[1].data.push(count.totalcount)
    ChartDataPost[2].data.push(count.cancelledcount)
    LabelsPost.push(count.date)
  })
  
   moneyorderrCount.map((count,i)=>{
     ChartDataMoneyorder[0].data.push(count.deliveredcount)
     ChartDataMoneyorder[1].data.push(count.totalcount)
     ChartDataMoneyorder[2].data.push(count.cancelledcount)
     LabelsMoneyorder.push(count.date)
   })

   courierAllCount.map((count,i)=>{
     ChartPieDataCourier.push(count.delivered)
     ChartPieDataCourier.push(count.assigned)
     ChartPieDataCourier.push(count.cancelled)
   })

  postAllCount.map((count,i)=>{
    ChartPieDataPost.push(count.delivered)
    ChartPieDataPost.push(count.assigned)
    ChartPieDataPost.push(count.cancelled)
  })

   moneyorderAllCount.map((count,i)=>{
     ChartPieDataMoneyorder.push(count.delivered)
     ChartPieDataMoneyorder.push(count.assigned)
     ChartPieDataMoneyorder.push(count.cancelled)
   })
  
  
console.log("ChartDataMoneyorder",ChartDataMoneyorder)
console.log("ChartDataPost",ChartDataPost)
console.log("ChartData",ChartData);
  return (
    <Page title="Dashboard | Easy Mail">
      <Container maxWidth="xl">
      <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
          <Typography variant="h6" color="#00EE00">Make it easy with EasyMail</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppCouriers />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppClerks />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppBugReports />
          </Grid>
          {/*<Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
         
          <Grid item xs={12} md={6} lg={8}>
            <LineChart 
            title="Post"
            url={'/clerk/post/filter'}
            subheader=""
            CHART_DATA = {ChartDataPost}
            labels={LabelsPost}
            
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Post total view"
            CHART_DATA={
              ChartPieDataPost
            }
            labels={
              ['Delivered post', 'Assigned', 'Cancelled post']
            }
            />
          </Grid>
            
          <Grid item xs={12} md={6} lg={8}>
            <LineChart 
            title="Courier"
            url={'/clerk/courier/filter'}
            subheader=""
            CHART_DATA = {ChartData}
            labels={Labels}
            
            
          /> 
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Courier total view"
            CHART_DATA={
              ChartPieDataCourier
            }
            labels={
              ['Delivered', 'Assigned', 'Cancelled']
            }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart 
            title="Money order"
            url={'/clerk/moneyorder/filter'}
            subheader=""
            CHART_DATA = {ChartDataMoneyorder}
            labels={LabelsMoneyorder}
            
          />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Money order total view"
            CHART_DATA={
              ChartPieDataMoneyorder
            }
            labels={
              ['Delivered', 'Assigned', 'Cancelled']
            }
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
          <Grid item xs={5} md={3} lg={15}>
            <AppTrafficBySite />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
       