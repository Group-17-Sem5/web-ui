import TextField from '@material-ui/core/TextField';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';

const DateFilter = ({url,children}) => {
    const token = localStorage.getItem('adminToken')
    const formik = useFormik({
        initialValues: {
          //id:'',
          startDate: '',
          endDate: ''
        },
        
        onSubmit: (values) => {
          fetch(process.env.REACT_APP_API_HOST+url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
            body: JSON.stringify( values)
            // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
          })
          .then(result=>{
            // if(result.status===200){
            //   navigate('/app', { replace: true });
            // }
            return result.json()
          })
          .then(data=>{
              console.log(data)
          })
        }
      });
    
      const { errors, touched, isSubmitting, handleSubmit, getFieldProps,setFieldValue } = formik;

    return(
        <FormikProvider value={formik}>
        <Form autoComplete="on"  onSubmit={handleSubmit}>
      <TextField
        id="date"
        label="From"
        type="date"
        {...getFieldProps('startDate')}
        // defaultValue= "2021-09-27"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{margin:'5px'}}
      />
      <TextField
        id="date"
        label="To"
        type="date"
        {...getFieldProps('endDate')}
        // defaultValue="2021-09-27"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{margin:'5px'}}
      />
      <LoadingButton
          
          style={{width:'30%',margin:'10px'}}
          size="large"
          type="submit"
          variant="contained"
        //   loading={isSubmitting}
        >
          Filter
        </LoadingButton>
      </Form>
    </FormikProvider>
    )
}
export default DateFilter