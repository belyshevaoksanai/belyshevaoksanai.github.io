import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { EqualizerIcon, LogoIcon } from "../../icons";

interface ILayoutProps {
    children: React.ReactElement;
}

export const Layout = ({ children }: ILayoutProps) => (
    <div>
        <AppBar>
            <Toolbar>
                <Box display='flex' justifyContent='space-between' width='100%'>
                    <Box display='flex' alignItems='center'>
                        <LogoIcon/>
                        <Typography color='primary'>pomodoro_box</Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <EqualizerIcon/>
                        <Typography color='primary'>Статистика</Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
        <Box pb={10} pl={10} pt={'100px'}>
            {children}
        </Box>
    </div>
)