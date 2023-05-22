import { Box, Typography } from "@mui/material";
import { PomodoroBar } from "./components/bar/bar";

export const StatisticsPage = () => (
    <Box>
        <Typography variant="h1">Ваша активность</Typography>
        <PomodoroBar />
    </Box>
);
