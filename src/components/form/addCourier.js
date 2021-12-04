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

export default function AddCourier() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const postSchema = Yup.object().shape({
    senderID: Yup.string().required('Sender is required'),
    receiverID: Yup.string().required('Receiver is required'),
    postManID: Yup.string(),
    weight: Yup.number().required('weight is required'),
    //courierID: Yup.string().required('CourierID is required'),
    sourceBranchID: Yup.string().required('Branch is required'),
    lastAppearedBranchID: Yup.string().required('Branch is required'),
    receivingBranchID: Yup.string().required('Branch is required'),
    addressID: Yup.string().required('Address is required'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });
  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/clerk/courier/update/'+id : '/clerk/courier/add' 

  const {data:branches} = useFetch('/admin/branch')
  const {data:users} = useFetch('/clerk/user/')
  const {data:postman} = useFetch('/clerk/postman')
  const {data: address} = useFetch('/clerk/address')
  const [val,setVal]=useState('')
  useEditData('/clerk/courier/'+id,
    data=>{
      if(data){
        
        setVal(data)
        setFieldValue('senderID',data.senderID)
        setFieldValue('receiverID',data.receiverID)
        setFieldValue('postManID',data.postManID)
        setFieldValue('sourceBranchID',data.sourceBranchID)
        setFieldValue('lastAppearedBranchID',data.lastAppearedBranchID)
        setFieldValue('receivingBranchID',data.receivingBranchID)
        setFieldValue('addressID',data.addressID)
        setFieldValue('weight',data.weight)
        //setFieldValue('courierID',data.courierID)
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      senderID: '',
      receiverID: '',
      postManID: '',
      sourceBranchID:'',
      lastAppearedBranchID: '',
      receivingBranchID:'',
      addressID:'',
      weight:0
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      console.log("post",values)
      fetch(process.env.REACT_APP_API_HOST+url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify( values)
        // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
      })
      .then(result=>{
        if(result.status===200){
          navigate('/dashboard/courier', { replace: true });
        }
        console.log(result.status)
      
      })
    
      }
});

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps ,setFieldValue} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
 
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
           
            options={postman}
            onChange={(event, value) =>setFieldValue('postManID',value.username)}
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
            onChange={(event, value) =>setFieldValue('lastAppearedBranchID',value.branchID)}
            renderInput={(params) => <TextField {...params} label="LastAppeared Branch" variant="outlined" 
            {...getFieldProps('lastAppearedBranchID')}
            name="lastAppearedBranchID"
            error={Boolean(touched.lastAppearedBranchID && errors.lastAppearedBranchID)}
            helperText={touched.lastAppearedBranchID && errors.lastAppearedBranchID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            
            options={branches}
            getOptionLabel={(option) => option.branchName}
            onChange={(event, value) =>setFieldValue('receivingBranchID',value.branchID)}
            renderInput={(params) => <TextField {...params} label="ReceivingBranch Branch" variant="outlined" 
            {...getFieldProps('receivingBranchID')}
            name="receivingBranchID"
            error={Boolean(touched.receivingBranchID && errors.receivingBranchID)}
            helperText={touched.receivingBranchID && errors.receivingBranchID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            
            <Autocomplete
            options={address}
            getOptionLabel={(option) => option.addressID}
            onChange={(event, value) =>setFieldValue('addressID',value.addressID)}
            //getOptionLabel={(option) => option.description}
            renderInput={(params) => <TextField {...params} label="Address (Only not receiver)" variant="outlined" 
            {...getFieldProps('addressID')}
            name="addressID"
            error={Boolean(touched.addressID && errors.addressID)}
            helperText={touched.addressID && errors.addressID}
            />}
            />
           </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="number"
            label="Weight"
            {...getFieldProps('weight')}
            error={Boolean(touched.weight && errors.weight)}
            helperText={touched.weight && errors.weight || 'weight in grams'}
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