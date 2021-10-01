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
// ----------------------------------------------------------------------

export default function DashboardApp() {
  var date = new Date();
  date.setDate(date.getDate() - 11);

console.log(date);
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
            subheader=""
            CHART_DATA = {[
              {
                name: 'Delivered post',
                type: 'line',
                // column
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
              },
              {
                name: 'Total post',
                type: 'line',
                // area
                data: [53, 18, 32, 27, 58, 22, 37, 23, 45, 23, 35]
              },
              {
                name: 'Cancelled post',
                type: 'line',
                data: [30, 7, 10, 0, 45, 0, 0, 0, 2, 1, 5]
              }
            ]}
            labels={
              [
                '09/27/2021',
                '09/26/2021',
                '09/25/2021',
                '09/24/2021',
                '09/23/2021',
                '09/22/2021',
                '09/21/2021',
                '09/20/2021',
                '09/19/2021',
                '09/18/2021',
                '09/17/2021'
              ]
            }
            
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Post total view"
            CHART_DATA={
              [23, 25, 2]
            }
            labels={
              ['Delivered post', 'Total post', 'Cancelled post']
            }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart 
            title="Courier"
            subheader=""
            CHART_DATA = {[
              {
                name: 'Delivered',
                type: 'line',
                // column
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
              },
              {
                name: 'Total',
                type: 'line',
                // area
                data: [53, 18, 32, 27, 58, 22, 37, 23, 45, 23, 35]
              },
              {
                name: 'Cancelled',
                type: 'line',
                data: [30, 7, 10, 0, 45, 0, 0, 0, 2, 1, 5]
              }
            ]}
            labels={
              [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003'
              ]
            }
            
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Courier total view"
            CHART_DATA={
              [4344, 5435, 1443]
            }
            labels={
              ['Delivered', 'Total', 'Cancelled']
            }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart 
            title="Money order"
            subheader=""
            CHART_DATA = {[
              {
                name: 'Delivered',
                type: 'line',
                // column
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
              },
              {
                name: 'Total',
                type: 'line',
                // area
                data: [53, 18, 32, 27, 58, 22, 37, 23, 45, 23, 35]
              },
              {
                name: 'Cancelled',
                type: 'line',
                data: [30, 7, 10, 0, 45, 0, 0, 0, 2, 1, 5]
              }
            ]}
            labels={
              [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003'
              ]
            }
            
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Money order total view"
            CHART_DATA={
              [4344, 5435, 1443]
            }
            labels={
              ['Delivered', 'Total', 'Cancelled']
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
