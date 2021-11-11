import * as Yup from 'yup';
import { useState } from 'react';
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
  Autocomplete,
  TableRow,
  TableCell,
  Grid
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Box, width } from '@material-ui/system';
import useEditData from 'src/hooks/useEditData';
import { useParams } from 'react-router';
import useFetch from 'src/hooks/useFetch';
import AlertComponent from '../animate/AlertComponent';
// ----------------------------------------------------------------------

export default function AddCourier() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const postSchema = Yup.object().shape({
    senderID: Yup.string().required('Sender is required'),
    receiverID: Yup.string().required('Receiver is required'),
    amount: Yup.number().required('weight is required')
    .test(
      'Is positive?', 
      'The amount must be positive value', 
      (value) => value >= 0
    ),
    specialCode: Yup.string().required('Specialcode is required'),
    // receivingBranchID: Yup.string().required('Branch is required'),
    // address: Yup.string().required('Address is required'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });
  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/postMaster/moneyorder/update/'+id : '/postMaster/moneyorder/add' 

  const {data:branches} = useFetch('/admin/branch')
  const {data:users} = useFetch('/postMaster/user/')
  const {data:postman} = useFetch('/postMaster/postman')
  const [val,setVal]=useState('')
  useEditData('/postMaster/moneyorder/'+id,
    data=>{
      if(data){
        setFieldValue('amount',data.amount)
        setFieldValue('senderID',data.senderID)
        setFieldValue('receiverID',data.receiverID)
        setFieldValue('postManID',data.postManID)
        setFieldValue('receivingBranchID',data.receivingBranchID)
        setFieldValue('specialCode',data.specialCode)
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      senderID: '',
      receiverID: '',
      postManID: null,
      receivingBranchID: '',
      amount:0,
      specialCode:''
      // address:''
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      fetch(process.env.REACT_APP_API_HOST+url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify( values)
        // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
      })
      .then(result=>{
        if(result.status===200){
          setSuccess(true)
          setTimeout(()=>{
            setSuccess(false)
            navigate('/app/viewMoneyOrders', { replace: true });
          },1000)
         
        }
       
      })
      
      }
});

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps ,setFieldValue} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
// console.log(values)
  return (
    <FormikProvider value={formik}>
      {success?<AlertComponent title={'Success!'}/>:null}
      <Form autoComplete="on"  onSubmit={handleSubmit}>
      <Box 
      sx={{
        '& > :not(style)': { mb:3 },boxShadow: 3 ,p:5
      }}
      >
          
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
          <Autocomplete
            
            options={users}
            onChange={(event, value) =>setFieldValue('senderID',value?.userName)}
            getOptionLabel={(option) => option.userName}
            renderInput={(params) => <TextField {...params} label="Sender" variant="outlined" 
            name="senderID"
            {...getFieldProps('senderID')}
            error={Boolean(touched.senderID && errors.senderID)}
            helperText={touched.senderID && errors.senderID}
            value={values.senderID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            
            <Autocomplete
            options={users}
            onChange={(event, value) =>setFieldValue('receiverID',value?.userName)}
            getOptionLabel={(option) => option.userName}
            renderInput={(params) => <TextField {...params} label="Receiver" variant="outlined" 
            {...getFieldProps('receiverID')}
            name="receiverID"
            error={Boolean(touched.receiverID && errors.receiverID)}
            helperText={touched.receiverID && errors.receiverID}
            />}
            />

           </Grid>
           <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
           
            options={postman}
            onChange={(event, value) =>setFieldValue('postManID',value?.username)}
            getOptionLabel={(option) => option.username}
            renderInput={(params) => <TextField {...params} label="Postman" variant="outlined" 
            {...getFieldProps('postManID')}
            name="postManID"
            error={Boolean(touched.postManID && errors.postManID)}
            helperText={touched.postManID && errors.postManID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            
            options={branches}
            getOptionLabel={(option) => option.branchName}
            onChange={(event, value) =>setFieldValue('receivingBranchID',value?.branchID)}
            renderInput={(params) => <TextField {...params} label="LastAppeared Branch" variant="outlined" 
            {...getFieldProps('receivingBranchID')}
            name="receivingBranchID"
            error={Boolean(touched.receivingBranchID && errors.receivingBranchID)}
            helperText={touched.receivingBranchID && errors.receivingBranchID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="text"
            label="specialCode"
            {...getFieldProps('specialCode')}
            error={Boolean(touched.specialCode && errors.specialCode)}
            helperText={touched.specialCode && errors.specialCode}
          />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="amount"
            label="Amount"
            {...getFieldProps('amount')}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount || 'amount in Rs'}
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
          disabled={!(formik.isValid && formik.dirty)}
        >
          Save Details
        </LoadingButton>
        
        </Box>
      </Form>
    </FormikProvider>
  );
}
