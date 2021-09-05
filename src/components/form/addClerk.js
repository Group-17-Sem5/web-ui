import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  CardContent
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

import useEditData from 'src/hooks/useEditData'
// ----------------------------------------------------------------------

export default function AddPostmanForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile number is required').matches(phoneRegExp, 'Mobile number is not valid'),
    branchId: Yup.string().required('Branch is required'),
    // firstName: Yup.string().required('First Name is required').min(2,'Too short').max(50,'Too long'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });


  const formik = useFormik({
    initialValues: {
      //id:'',
      username: '',
      mobileNumber: '',
      branchId: '',
      password:''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const options = { method:"post", body: values }
            fetch(process.env.REACT_APP_API_HOST + '/clerks', options).then(data => {
                setIsPending(false)
                afterSubmit(data)
            }).catch(console.log)
      console.log(values)
      //navigate('/app', { replace: true });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  

  return (
    <FormikProvider value={formik}>
      <Form 
      autoComplete="on" 
      noValidate 
      onSubmit={formik.handleSubmit}
      //handlers={handlers}
      action={id ? "/clerks/" + id : "/clerks"}
      method={id ? "PUT" : "POST"}
      >
      <Card>
          <CardContent>

        <Stack spacing={3}>
          <TextField
            fullWidth
            // autoComplete="username"
            type="email"
            label="Email address"
            name= "username"
            value={formik.values.username}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            // autoComplete="username"
            type="password"
            label=" address"
            name= "password"
            value={formik.values.password}
            {...getFieldProps('password')}
            
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="number"
            label="Phone Number"
            name="mobileNumber"
            value={formik.values.mobileNumber}
            {...getFieldProps('mobileNumber')}
            error={Boolean(touched.mobileNumber && errors.mobileNumber)}
            helperText={touched.mobileNumber && errors.mobileNumber}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="text"
            label="Branch Name"
            name="branchId"
            value={formik.values.branchId}
            {...getFieldProps('branchId')}
            error={Boolean(touched.branch && errors.branch)}
            helperText={touched.branch && errors.branch}
            onChange={formik.handleChange}
          />

  
          {/* <TextField
            fullWidth
            autoComplete="current-password"
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
          /> */}
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack> */}
        <br/>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Details
        </LoadingButton>
        </CardContent>
</Card>
      </Form>
    </FormikProvider>
  );
}
