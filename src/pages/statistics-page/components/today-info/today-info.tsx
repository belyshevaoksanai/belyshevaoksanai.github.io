import { Box, BoxProps, Typography, styled } from "@mui/material";
import { PomodoroIcon } from "../../../../icons";
import { useSelector } from "react-redux";
import { selectorSelectedDay } from "../../../../store/statistic/selector";
import moment from "moment";
import { selectorHistiory } from "../../../../store/timer/selector";
import { theme } from "../../../../theme";
import { getTime } from "../../../../utils/get-time";

moment.updateLocale('en', {
    week: {
        dow: 1, // Monday is the first day of the week.
    }
});

const TimerWrapperBlock = styled(Box)<BoxProps>(({ theme }) => ({
    '&.MuiBox-root': {
        background: '#F4F4F4',
        width: '296px',
        boxSizing: 'border-box',
    },
}));

const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export const TodayInfo = () => {
    const selectedDay = useSelector(selectorSelectedDay);
    const history = useSelector(selectorHistiory);
    
    const time = getTime(history[selectedDay]?.taskTime);
    const pomodoroCount = history[selectedDay]?.pomodoroDone || 0;

    return (
        <Box display="flex" justifyContent="space-between" flexDirection="column">
            <TimerWrapperBlock mb={4} padding="25px" height="260px">
                <Box mb="14px">
                    <Typography variant="h1">{selectedDay ? weekDays[moment(selectedDay, 'DD.MM.yyyy').day()] : ''}</Typography>
                </Box>
                <Typography>Вы работали над задачами в течение {time}</Typography>
            </TimerWrapperBlock>
            <TimerWrapperBlock height="179px" paddingTop="25px" display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
                    <Box display="flex" alignItems="center">
                        <PomodoroIcon />
                        <Typography>x {pomodoroCount}</Typography>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    padding="9px"
                    style={{
                        background: theme.palette.primary.main,
                    }}
                >
                    <Typography variant="h1" color="white">{pomodoroCount} помидора</Typography>
                </Box>
            </TimerWrapperBlock>
        </Box>
    )
}
