import { Box, Button, Typography } from "@mui/material"
import { useCountdown } from "../../../../hooks/use-countdown";

interface ITimerProps {
}

export const Timer = ({}: ITimerProps) => {
    const [startTimer, stopTimer, timer] = useCountdown();
    return (<Box display="flex" flexDirection="column" width="100%" alignItems="center">
        <Box>
            <Typography style={{fontSize: '150px'}}>{timer.minutes}:{`${timer.seconds < 10 ? '0' + timer.seconds : timer.seconds}`}</Typography>
        </Box>
        <Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={startTimer}
            >
                Старт
            </Button>
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