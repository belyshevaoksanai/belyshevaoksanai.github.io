import { Box } from "@mui/material";
import { Description } from "./components";
import { AddTaskForm } from "./components/add-task-form";
import { TaskList } from "./components/task-list/task-list";
import { TimerBlock } from "./components/timer-block";

interface ITimerProps {
    startTimer: () => void;
    stopTimer: () => void;
    pauseTimer: () => void;
}

export const TimerPage = (props: ITimerProps) => (
    <Box display='flex'>
        <Box width="550px">
            <Description/>
            <Box width="370px">
                <AddTaskForm/>
                <TaskList />
            </Box>
        </Box>
        <Box>
            <TimerBlock {...props} />
        </Box>
    </Box>
)