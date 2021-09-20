import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Card,
  CardContent,
  MenuItem,
  Grid
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Box } from '@material-ui/system';
import { options } from 'numeral';
import { result } from 'lodash';
import useEditData from 'src/hooks/useEditData';
import { useParams } from 'react-router';
import { id } from 'date-fns/locale';
import { useDetail } from 'src/context/DetailContext';

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [val,setVal] = useState()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const postmanSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(6,'Minimum 6 charecters'),
    conPassword: Yup.string().required('Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  const token = localStorage.getItem('adminToken')
  const {user} = useDetail()
  const id = (user._id)
  const url = (user.type)=='postmaster' ? '/admin/postmaster/updatePassword/'+id : '' 



  const formik = useFormik({
    initialValues:{
      password:'',
      conPassword:''
    },
    validationSchema: postmanSchema,
    onSubmit: (values) => {
      
      fetch(process.env.REACT_APP_API_HOST+url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify( values)
        // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
      })
      .then(result=>{
        if(result.status===200){
          navigate('/app/profile', { replace: true });
        }
        console.log(result.status)
      })
     
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowConPassword = () => {
    setShowConPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="on"  onSubmit={handleSubmit}>
      <Box 
      sx={{
        '& > :not(style)': {mb:3},p:5
      }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
          <TextField
            fullWidth
            // autoComplete="username"
            type={showConPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('conPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConPassword} edge="end">
                    <Icon icon={showConPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.conPassword && errors.conPassword)}
            helperText={touched.conPassword && errors.conPassword}
          />
          </Grid>
          </Grid>
          
        
        

<LoadingButton
          fullWidth
          style={{width:'100%'}}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Details
        </LoadingButton></Box>
      </Form>
    </FormikProvider>
  );
}
