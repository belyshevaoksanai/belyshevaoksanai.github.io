import { Box, BoxProps, Typography, styled } from "@mui/material"
import { Timer } from "../timer/timer";
import { useSelector } from "react-redux";
import { selectorFirstTask, selectorTimerStatus } from "../../../../store/timer/selector";
import { TimerStatusEnum } from "../../../../constants/timer-status";

const TimerWrapperBlock = styled(Box)<BoxProps>(({ theme }) => ({
    '&.MuiBox-root': {
        background: '#F4F4F4',
        width: '733px',
        height: '507px',
    },
}));

const TitleWrapperBlock = styled(Box)<BoxProps & { background?: string | null }>(({ theme, background }) => ({
    '&.MuiBox-root': {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 40px',
        alignItems: 'center',
        background: background || '#C4C4C4',
        height: '55px',
    },
}));

interface ITimerBlockProps {
    startTimer: () => void;
    stopTimer: () => void;
    pauseTimer: () => void;
    doneTask: () => void;
    skipPause: () => void;
}

export const TimerBlock = (props: ITimerBlockProps) => {
    const firstTask = useSelector(selectorFirstTask);
    const status = useSelector(selectorTimerStatus);

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
            <TitleWrapperBlock background={status === TimerStatusEnum.IN_PROGRESS && firstTask.type !== 'PAUSE'
                ? '#DC3E22'
                : status === TimerStatusEnum.PAUSE_TASK || firstTask.type === 'PAUSE'
                ? '#A8B64F'
                : null}>
                {
                    firstTask.type === 'USER' && (
                        <>
                            <Typography color="white">{firstTask.name}</Typography>
                            <Typography color="white">Помидор {firstTask.countDone + 1}</Typography>
                        </>
                    )
                }
                {
                    firstTask.type === 'PAUSE' && (
                        <>
                            <Typography color="white">{firstTask.name}</Typography>
                            <Typography color="white">Перерыв {firstTask.count + 1}</Typography>
                        </>
                    )
                }
            </TitleWrapperBlock>
            <Box display="flex" alignItems="center" height="452px">
                <Timer {...props} />
            </Box>
        </TimerWrapperBlock>
    )
}