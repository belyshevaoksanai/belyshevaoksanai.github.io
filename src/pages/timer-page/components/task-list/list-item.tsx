import { Box, BoxProps, TextField, TextFieldProps, Typography, styled } from "@mui/material"
import { Menu } from "../menu";
import { useDispatch } from "react-redux";
import { ActionEnum } from "../../../../constants/actions";
import { useEffect, useRef, useState } from "react";
import { confirmDialogAction } from "../../../../store/confirm-dialog/confirm-dialog";
import { timerAction } from "../../../../store/timer/timer";

const TaskWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    '&.MuiBox-root:first-of-type': {
        borderTop: '1px solid black',
    },
    '&.MuiBox-root': {
        borderBottom: '1px solid black',
        paddingTop: '15px',
        paddingBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const TextFieldWithoutBorder = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: 0,
    },
}));



export const TaskItem = ({ name, count, id }: { name: string, count: number, id: string }) => {
    const ref = useRef<HTMLInputElement>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskName, setTaskName] = useState(name);
    const dispatch = useDispatch();

    const handleMenuClick = (action: ActionEnum) => {
        switch (action) {
            case ActionEnum.ADD_POMODORO:
                dispatch(timerAction.onAddPomodoro(id))
                break;
            case ActionEnum.DELETE_POMODORO:
                dispatch(timerAction.onDeletePomodoro(id))
                break;
            case ActionEnum.DELETE_TASK:
                dispatch(confirmDialogAction.setMessage({
                    message: 'Удалить?',
                    onConfirm: () => {
                        dispatch(timerAction.onDeleteTask(id));
                        dispatch(timerAction.clearTimer());
                    },
                }));
                break;
            case ActionEnum.EDIT_TASK:
                setIsEditMode(true);
                break;
        }
    }

    const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setTaskName(event.currentTarget.value);
    }

    const handleChangeTaskName = () => {
        dispatch(timerAction.editTaskName({ id, taskName }));
        setIsEditMode(false);
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
            ref.current.setSelectionRange(0, taskName.length);
        }
    }, [isEditMode]);

    return (
        <TaskWrapper>
            <Box display="flex">
                <div style={{ border: '1px solid #C4C4C4', borderRadius: 100, marginRight: '10px' }}>
                    <Typography paddingX="7px">{count}</Typography>
                </div>
                {isEditMode ?
                    (
                        <TextFieldWithoutBorder
                            value={taskName}
                            onChange={handleChangeTask}
                            onBlur={handleChangeTaskName}
                            inputRef={ref}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    )
                    : (
                        <Typography>{name}</Typography>
                    )}
            </Box>
            <Menu
                onClick={handleMenuClick}
                count={count}
            />
        </TaskWrapper>
    )
}