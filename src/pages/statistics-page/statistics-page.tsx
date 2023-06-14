import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { PomodoroBar } from "./components/bar/bar";
import { TodayInfo } from "./components/today-info/today-info";
import { useSelector } from "react-redux";
import { selectorWeek } from "../../store/timer/selector";
import { useDispatch } from "react-redux";
import { timerAction } from "../../store/timer/timer";
import { TimerInfo } from "./components/timer-info/timer-info";

export const StatisticsPage = () => {
    const dispatch = useDispatch();
    const week = useSelector(selectorWeek);

    const handleChangeWeek = (event: SelectChangeEvent<0 | 1 | 2 | string>) => {
        dispatch(timerAction.setWeek(event.target.value))
    };

    return (
        <Box>
            <Box mb={4}>
                <Box display="flex" justifyContent="space-between" mb="30px">
                    <Typography variant="h1">Ваша активность</Typography>
                    <Select value={week} onChange={handleChangeWeek}>
                        <MenuItem value={0}>Эта неделя</MenuItem>
                        <MenuItem value={1}>Прошедшая неделя</MenuItem>
                        <MenuItem value={2}>2 недели назад</MenuItem>
                    </Select>
                </Box>
                <Box display="flex" flexDirection="row" columnGap="32px">
                    <TodayInfo />
                    <PomodoroBar />
                </Box>
            </Box>
            <Box>
                <TimerInfo />
            </Box>
        </Box>
    )
};
