import { Components, Theme } from "@mui/material";

export const components: Components<Omit<Theme, "components">> = {
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: 'white',
                boxShadow: '0px 10px 63px 0px #00000012',
                position: 'relative',
            }
        }
    },
    MuiToolbar: {
        styleOverrides: {
            root: {
                '@media (min-width: 600px)': {
                    paddingLeft: '80px',
                    paddingRight: '80px',
                }
            }
        }
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                background: '#F4F4F4',
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                }
            },
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 0,
                boxShadow: 'none',
                padding: '19px 50px',
                fontSize: '16px',
                lineHeight: '17px',
                textTransform: 'none',
                '&:hover': {
                    boxShadow: 'none',
                },
                '&:not(:last-of-type)': {
                    marginRight: '25px',
                }
            }
        },
        defaultProps: {
            fullWidth: false,
        }
    }
};
