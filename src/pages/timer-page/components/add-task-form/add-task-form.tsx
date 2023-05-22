import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { timerAction } from "../../../../store/timer/timer";
import { selectorTaskName, selectorErrorMessage } from "../../../../store/timer/selector";

export const AddTaskForm = () => {
    const taskName = useSelector(selectorTaskName);
    const errorMessage = useSelector(selectorErrorMessage);
    const dispatch = useDispatch();

    const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(timerAction.changeTaskName(event.currentTarget.value));
    }

    const handleAddTask = () => {
        dispatch(timerAction.addTask());
    }

    return (
        <Box display="flex" flexDirection="column" width={300} rowGap='25px'>
            <Box>
                <TextField
                    placeholder="Название задачи"
                    value={taskName}
                    onChange={handleChangeTask}
                    fullWidth={true}
                />
                <FormHelperText error={true}>{errorMessage || ' '}</FormHelperText>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddTask}
                    disabled={!!errorMessage}
                >
                    Добавить
                </Button>
            </Box>
        </Box>
    )
}
