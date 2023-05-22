import { Box, Button, Typography } from "@mui/material"
import { useCountdown } from "../../../../hooks/use-countdown";
import { useSelector } from "react-redux";
import { selectorFirstTask, selectorTaskTimer, selectorTimerStatus } from "../../../../store/timer/selector";
import { TimerStatusEnum } from "../../../../constants/timer-status";

interface ITimerProps {
    startTimer: () => void;
    stopTimer: () => void;
    pauseTimer: () => void;
}

const getDigitWithZero = (digit: number) => digit < 10 ? '0' + digit : digit;

export const Timer = ({ startTimer, stopTimer, pauseTimer }: ITimerProps) => {
    const timer = useSelector(selectorTaskTimer);
    const task = useSelector(selectorFirstTask);
    const status = useSelector(selectorTimerStatus);
    return (<Box display="flex" flexDirection="column" width="100%" alignItems="center">
        <Box>
            <Typography style={{ fontSize: '150px' }}>{getDigitWithZero(timer.minutes)}:{`${getDigitWithZero(timer.seconds)}`}</Typography>
        </Box>
        <Box>
            {
                task.type === 'PAUSE' && status !== TimerStatusEnum.IN_PROGRESS && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={startTimer}
                    >
                        Старт
                    </Button>
                )
            }
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
                        Старт
                    </Button>
                )
            }
            <Button
                variant="contained"
                color="secondary"
                onClick={stopTimer}
            >
                Стоп
            </Button>
        </Box>
    </Box>)
}