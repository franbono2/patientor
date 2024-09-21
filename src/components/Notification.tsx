// ErrorNotification.tsx
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ open, message }:{ open: boolean, message: string }) => {

  return (
    <Snackbar open={open}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
