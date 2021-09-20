// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
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
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits 
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
            <AppCurrentVisits 
            title="Post total view"
            CHART_DATA={
              [4344, 5435, 1443]
            }
            labels={
              ['Delivered post', 'Total post', 'Cancelled post']
            }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits 
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
            <AppCurrentVisits 
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
            <AppWebsiteVisits 
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
            <AppCurrentVisits 
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
