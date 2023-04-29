import { Box, BoxProps, Typography, styled } from "@mui/material"
import { Timer } from "../timer/timer";
import { useSelector } from "react-redux";
import { selectorFirstTask } from "../../../../store/task/selector";

const TimerWrapperBlock = styled(Box)<BoxProps>(({ theme }) => ({
    '&.MuiBox-root': {
        background: '#F4F4F4',
        width: '733px',
        height: '507px',
    },
}));

const TitleWrapperBlock = styled(Box)<BoxProps>(({ theme }) => ({
    '&.MuiBox-root': {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 40px',
        alignItems: 'center',
        background: '#C4C4C4',
        height: '55px',
    },
}));

export const TimerBlock = () => {
    const firstTask = useSelector(selectorFirstTask);
    if (!firstTask) {
        return (
            <TimerWrapperBlock>
                <TitleWrapperBlock>
                </TitleWrapperBlock>
                <Box display="flex" alignItems="center" justifyContent="center" height="452px">
                    <Typography>Нет задач</Typography>
                </Box>
            </TimerWrapperBlock>
        )
    }

    return (
        <TimerWrapperBlock>
            <TitleWrapperBlock>
                <Typography>{firstTask.name}</Typography>
                <Typography>Помидор {firstTask.count}</Typography>
            </TitleWrapperBlock>
            <Box display="flex" alignItems="center" height="452px">
                <Timer/>
            </Box>
        </TimerWrapperBlock>
    )
}