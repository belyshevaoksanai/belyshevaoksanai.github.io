import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectorMessage } from '../../store/confirm-dialog/selector';
import { confirmDialogAction } from '../../store/confirm-dialog/confirm-dialog';

export const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const { message, onConfirm } = useSelector(selectorMessage);

  const handleClose = () => {
    dispatch(confirmDialogAction.clear());
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
      <Dialog
        open={!!message}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {message}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleConfirm} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
  );
}