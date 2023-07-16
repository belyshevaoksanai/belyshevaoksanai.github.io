import { Box, Button, ButtonProps, Typography, styled } from "@mui/material"
import { useSelector } from "react-redux";
import { selectorFirstTask, selectorTaskTimer, selectorTimerStatus } from "../../../../store/timer/selector";
import { TimerStatusEnum } from "../../../../constants/timer-status";
import { useDispatch } from "react-redux";
import { timerAction } from "../../../../store/timer/timer";


const EllipseButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '&.MuiButton-root': {
        height: 60,
        width: 50,
        borderRadius: 50,
        padding: 0,
        fontSize: 26,
        backgroundColor: '#C4C4C4',
    },
    '&.MuiButton-root:hover': {
        backgroundColor: '#A8B64F',
    },
}));

interface ITimerProps {
    startTimer: () => void;
    stopTimer: () => void;
    pauseTimer: () => void;
    doneTask: () => void;
    skipPause: () => void;
}

const getDigitWithZero = (digit: number) => digit < 10 ? '0' + digit : digit;

export const Timer = ({ startTimer, stopTimer, pauseTimer, doneTask, skipPause }: ITimerProps) => {
    const dispatch = useDispatch();
    const timer = useSelector(selectorTaskTimer);
    const task = useSelector(selectorFirstTask);
    const status = useSelector(selectorTimerStatus);

    const handleClickAdd = () => {
        dispatch(timerAction.addTime());
    }

    return (<Box display="flex" flexDirection="column" width="100%" alignItems="center">
        <Box display="flex" alignItems="center" columnGap="20px" marginLeft="70px">
            <Typography
                color={status === TimerStatusEnum.IN_PROGRESS && task.type !== 'PAUSE'
                    ? '#DC3E22'
                    : status === TimerStatusEnum.PAUSE_TASK || task.type === 'PAUSE'
                        ? '#A8B64F'
                        : '#333333'}
                style={{ fontSize: '150px', fontWeight: 200 }}>
                {getDigitWithZero(timer.minutes)}:{`${getDigitWithZero(timer.seconds)}`}
            </Typography>
            <EllipseButton variant="contained" onClick={handleClickAdd}>
                <span>+</span>
            </EllipseButton>
        </Box>
        <Box>
            {
                task.type === 'USER' && status === TimerStatusEnum.IN_PROGRESS && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={pauseTimer}
                    >
                        Пауза
                    </Button>
                )
            }
            {
                task.type === 'USER' && status !== TimerStatusEnum.IN_PROGRESS && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={startTimer}
                    >
                        {status === TimerStatusEnum.PAUSE_TASK ? 'Продолжить' : 'Старт'}
                    </Button>
                )
            }
            {
                task.type === 'USER' && status === TimerStatusEnum.PAUSE_TASK && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={doneTask}
                    >
                        Сделано
                    </Button>
                )
            }
            {
                task.type === 'USER' && status !== TimerStatusEnum.PAUSE_TASK && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={stopTimer}
                        disabled={status === TimerStatusEnum.INIT}
                    >
                        Стоп
                    </Button>
                )
            }
            {
                task.type === 'PAUSE' && status === TimerStatusEnum.IN_PROGRESS && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={stopTimer}
                    >
                        Пауза
                    </Button>
                )
            }
            {
                task.type === 'PAUSE' && status !== TimerStatusEnum.IN_PROGRESS && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={startTimer}
                    >
                        Продолжить
                    </Button>
                )
            }
            {
                task.type === 'PAUSE' && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={skipPause}
                    >
                        Пропустить
                    </Button>
                )
            }
        </Box>
    </Box>)
}