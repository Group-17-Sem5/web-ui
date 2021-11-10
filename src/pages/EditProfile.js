import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { 
    Grid, 
    Button, 
    Container, 
    Stack, 
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader,
    Box,
    Avatar,
    TableRow,
    Table,
    TableCell
 } from '@material-ui/core';
// components
import Page from '../components/Page';
import { sentenceCase } from 'change-case';
import DetailsChart from '../detailsCharts/DetailsChart'
import useFetch from 'src/hooks/useFetch';
import { useParams } from 'react-router';
import Label from 'src/components/Label'
import { useDetail } from 'src/context/DetailContext';
import userOutlined from '@iconify/icons-ant-design/user-outlined';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import EditProfile from 'src/components/form/editProfile';
import ChangePassword from 'src/components/form/changePassword';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Profile() {
    const {id} = useParams()
    const {user} = useDetail()
    const {data:profile} = id ? useFetch('/postMaster/postman/'+id) : useFetch('/admin/postmaster/'+user._id)
    console.log(profile)
  return (
    <Page title="Profile | Easy Mail">
      <Container>
        <Grid spacing={3} container  >
            <Grid item xs={12} md={2} sx={{ p: 2, margin: 'auto', flexGrow: 1 }} style={{padding: '0 1.5rem 0 2.5rem',float:'left',textAlign:'center',display:'flex'}}>
                <Table>
                    <TableRow> <Icon icon={userOutlined} width={50} height={50} /></TableRow>
                    <TableRow>Change your profile details</TableRow>
               </Table>
            </Grid>
            <Grid item md={9} xs={12} >
                <Card sx={{boxShadow:5,mb:5}}>
                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                        <EditProfile />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} md={2} sx={{ p: 2, margin: 'auto', flexGrow: 1 }} style={{padding: '0 1.5rem 0 2.5rem',float:'left',textAlign:'center',display:'flex'}}>
                <Table>
                    <TableRow> <Icon icon={settings2Fill} width={50} height={50} /></TableRow>
                    <TableRow>Change your password</TableRow>
               </Table>
            </Grid>
            <Grid item md={9} xs={12}  style={{marginTop:'30px'}}>
                <Card sx={{boxShadow:5}}>
                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                        <ChangePassword />
                    </Box>
                </Card>
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
