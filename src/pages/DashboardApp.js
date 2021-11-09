// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import LineChart from 'src/components/dashboard/LineChart';
import PieChart from 'src/components/dashboard/PieChart';
import { Icon } from '@iconify/react';
import CardWidgets from 'src/components/dashboard/CardWidgets';
import dropboxoutlined from '@iconify/icons-ant-design/dropbox-outlined';
import dollarcirclefilled from '@iconify/icons-ant-design/dollar-circle-filled';
import userOutlined from '@iconify/icons-ant-design/user-outlined';
import mailFilled from '@iconify/icons-ant-design/mail-filled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useFetch from 'src/hooks/useFetch';
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

  const {data:courierCount} = useFetch('/postMaster/courier/count')
  const {data:postCount} = useFetch('/postMaster/post/count')
  const {data:moneyorderrCount} = useFetch('/postMaster/moneyorder/count')
  const {data:courierAllCount} = useFetch('/postMaster/courier/allCount')
  const {data:postAllCount} = useFetch('/postMaster/post/allCount')
  const {data:moneyorderAllCount} = useFetch('/postMaster/moneyorder/allCount')

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
  
  
console.log(ChartDataMoneyorder)
console.log(ChartDataPost)
console.log(ChartData);
  return (
    <Page title="Dashboard | Easy Mail">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <CardWidgets 
            title="Postman"
            url="/postMaster/postman"
            Icon = {<Icon icon={userOutlined} width={24} height={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardWidgets 
            title="Mails"
            url="/postMaster/post"
            Icon = {<Icon icon={mailFilled} width={24} height={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardWidgets 
            title="Couriers"
            url="/postMaster/courier"
            Icon = {<Icon icon={dropboxoutlined} width={24} height={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardWidgets 
            title="Money orders"
            url="/postMaster/moneyorder"
            Icon = {<Icon icon={dollarcirclefilled} width={24} height={24} />}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart 
            title="Post"
            url={'/postMaster/post/filter'}
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
            url={'/postMaster/courier/filter'}
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
            url={'/postMaster/moneyorder/filter'}
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
        </Grid>
      </Container>
    </Page>
  );
}
