import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { components } from './components';
import { typography } from './typography';

export const theme = createTheme({
  palette,
  components,
  typography,
});