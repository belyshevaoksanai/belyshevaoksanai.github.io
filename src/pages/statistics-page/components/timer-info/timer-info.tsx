import { Box, Typography } from "@mui/material";
import { CancelIcon, ClockIcon, FocusIcon } from "../../../../icons";
import { useSelector } from "react-redux";
import { selectorSelectedDay } from "../../../../store/statistic/selector";
import { selectorHistiory } from "../../../../store/timer/selector";
import { getTime } from "../../../../utils/get-time";

interface ITimerCardProps {
    title: string;
    text: string;
    background: string;
    icon: React.ReactElement;
}

const TimerInfoCard = ({title, text, background, icon}: ITimerCardProps) => (
    <Box
        width="355px"
        style={{ background: background }}
        display="flex"
        padding="25px"
        justifyContent="space-between"
    >
        <Box display="flex" justifyContent="space-between" flexDirection="column">
            <Typography typography="h1">{title}</Typography>
            <Typography fontSize={65} lineHeight="65px">{text}</Typography>
        </Box>
        {icon}
    </Box>
)

export const TimerInfo = () => {
    const selectedDay = useSelector(selectorSelectedDay);
    const history = useSelector(selectorHistiory);
    
    const day = history[selectedDay];
    const taskTime = day?.taskTime || 0;
    const pauseTime = day?.pauseTime || 0;
    const pauseCount = day?.pauseCount || 0;
    const focus = taskTime || pauseTime ? (taskTime/(taskTime + pauseTime)*100).toFixed(0) : 0;
    
    return (
    <Box display="flex" columnGap={4}>
        <TimerInfoCard title="Фокус" text={`${focus}%`} background="#FFDDA9" icon={<FocusIcon />}/>
        <TimerInfoCard title="Время на паузе" text={getTime(pauseTime, true)} background="#DFDCFE" icon={<ClockIcon />}/>
        <TimerInfoCard title="Остановки" text={pauseCount.toString()} background="#C5F1FF" icon={<CancelIcon />}/>
    </Box>
)}
