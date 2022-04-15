import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../api';

export default () => {
  const [input, setInput] = React.useState('');
  const open = React.useMemo(() => !api.hasUserpass(), []);

  const handleProceed = React.useCallback((password) => {
    if (api.hasUserpass()) {
      return;
    }
    api.authByPassword({ password });
  }, []);

  React.useEffect(() => {
    handleProceed(null);
  }, [handleProceed]);

  const dialog = React.useMemo(() => (
    <Dialog open={open} onClose={handleProceed(input)}>
      <DialogTitle>จำเป็นต้องเข้าสู่ระบบ</DialogTitle>
      <DialogContent>
        <DialogContentText>
        เว้นว่างไว้หากคุณไม่ได้ตั้งรหัสผ่าน
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="password"
          type="password"
          color="secondary"
          value={input}
          onChange={(ev) => { setInput(ev.target.value); }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProceed} color="secondary">
        ดำเนินการ
        </Button>
      </DialogActions>
    </Dialog>
  ), [handleProceed, input, open]);

  return dialog;
};
