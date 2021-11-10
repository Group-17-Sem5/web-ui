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
    Avatar,
    Autocomplete,
    TextField,
 } from '@material-ui/core';


const UserDetails = ({userDetails,title}) => {
    return(
        <Grid xs={12} md={6} item>
            <Card >
                <CardActionArea >
                <CardContent>
                    <h2>{title}</h2><br/>
                        <Grid container spacing={3} >
                            <Grid item sm={4} >
                                <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    User Name
                                </Typography>
                            </Grid>
                            <Grid item sm={8} >
                                <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    {userDetails && userDetails.userName}
                                </Typography>
                            </Grid>
                            <Grid item sm={4} >
                                <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    Mobile Number
                                </Typography>
                            </Grid>
                            <Grid item sm={8} >
                                <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    {userDetails && userDetails.mobileNumber}
                                </Typography>
                            </Grid>
                            <Grid item sm={4} >
                                <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    Address
                                </Typography>
                            </Grid>
                            <Grid item sm={8} >
                                <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    {userDetails && userDetails.address || 'jaffna'}
                                </Typography>
                            </Grid>
                            <Grid item sm={4} >
                                <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item sm={8} >
                                <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                    {userDetails && userDetails.email }
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
export default UserDetails