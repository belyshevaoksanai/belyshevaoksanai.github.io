import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectorErrorMessage, selectorTaskName } from "../../../../store/task/selector";
import { taskAction } from "../../../../store/task/task";

export const AddTaskForm = () => {
    const taskName = useSelector(selectorTaskName);
    const errorMessage = useSelector(selectorErrorMessage);
    const dispatch = useDispatch();

    const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(taskAction.changeTaskName(event.currentTarget.value));
    }

    const handleAddTask = () => {
        dispatch(taskAction.addTask());
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
