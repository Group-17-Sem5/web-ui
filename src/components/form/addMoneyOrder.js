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
// ----------------------------------------------------------------------

export default function AddMoneyOrder() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const postSchema = Yup.object().shape({
    senderID: Yup.string().required('Sender is required'),
    receiverID: Yup.string().required('Receiver is required'),
    amount: Yup.number().required('amount is required'),
    sourceBranchID: Yup.string().required('Branch is required'),
    receivingBranchID: Yup.string().required('Branch is required'),
    specialCode: Yup.string().required('Special Code is required'),
    // isCancelled: Yup.string().required('Enter true or false'),
    // isDelivered: Yup.string().required('Enter true or false'),
    // address: Yup.string().required('Address is required'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });
  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/clerk/moneyorder/update/'+id : '/clerk/moneyorder/add' 

  const {data:branches} = useFetch('/admin/branch')
  const {data:users} = useFetch('/clerk/user/')
  
  const [val,setVal]=useState('')
  useEditData('/clerk/moneyorder/'+id,
    data=>{
      if(data){
        setVal(data)
        setFieldValue('senderID',data.senderID)
        setFieldValue('receiverID',data.receiverID)
        setFieldValue('sourceBranchID',data.sourceBranchID)
        setFieldValue('receivingBranchID',data.receivingBranchID)
        setFieldValue('specialCode',data.specialCode)
        setFieldValue('amount',data.amount)
        // setFieldValue('isCancelled',data.isCancelled)
        // setFieldValue('isDelivered',data.isDelivered)
      
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      senderID: '',
      receiverID: '',
      sourceBranchID: '',
      receivingBranchID: '',
      specialCode:'',
      amount:0,
      // isCancelled:'',
      // isDelivered:''
      // address:''
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      console.log("fuccccckkkk",values)
      fetch(process.env.REACT_APP_API_HOST+url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify( values)
        // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
      })
      .then(result=>{
        if(result.status===200){
          navigate('/dashboard/moneyorder', { replace: true });
        }
        console.log(result.status)
      })
      
      }
});

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps ,setFieldValue} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
console.log(values)
  return (
    <FormikProvider value={formik}>
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
            onChange={(event, value) =>setFieldValue('senderID',value.userName)}
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
            onChange={(event, value) =>setFieldValue('receiverID',value.userName)}
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
            
            options={branches}
            getOptionLabel={(option) => option.branchName}
            onChange={(event, value) =>setFieldValue('sourceBranchID',value.branchID)}
            renderInput={(params) => <TextField {...params} label="Source Branch" variant="outlined" 
            {...getFieldProps('sourceBranchID')}
            name="sourceBranchID"
            error={Boolean(touched.sourceBranchID && errors.sourceBranchID)}
            helperText={touched.sourceBranchID && errors.sourceBranchID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            
            options={branches}
            getOptionLabel={(option) => option.branchName}
            onChange={(event, value) =>setFieldValue('receivingBranchID',value.branchID)}
            renderInput={(params) => <TextField {...params} label="Receiving Branch" variant="outlined" 
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
            label="Special Code"
            {...getFieldProps('specialCode')}
            error={Boolean(touched.specialCode && errors.specialCode)}
            helperText={touched.specialCode && errors.specialCode || 'Special Code is'}
          />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="number"
            label="Amount"
            {...getFieldProps('amount')}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount || 'amount in Rs'}
          />
            </Grid>
            {/*<Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="isCancelled"
            label="isCancelled"
            {...getFieldProps('isCancelled')}
            error={Boolean(touched.isCancelled && errors.isCancelled)}
            helperText={touched.isCancelled && errors.isCancelled || 'true or false'}
          />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="isDelivered"
            label="isDelivered"
            {...getFieldProps('isDelivered')}
            error={Boolean(touched.isDelivered && errors.isDelivered)}
            helperText={touched.isDelivered && errors.isDelivered || 'true or false'}
          />
    </Grid>*/}
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
        </LoadingButton>
        
        </Box>
      </Form>
    </FormikProvider>
  );
}