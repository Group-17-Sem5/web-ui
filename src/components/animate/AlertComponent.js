import * as React from 'react';
import {Alert,Stack} from '@material-ui/core';

export default function AlertComponent({title}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{title}</Alert>
    </Stack>
  );
}
