import { useSelector } from "react-redux";
import { TaskItem } from "./list-item";
import { Box, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { timerAction } from "../../../../store/timer/timer";
import { selectorTaskList, selectorSumOfTime, selectorTimerStatus } from "../../../../store/timer/selector";
import { TimerStatusEnum } from "../../../../constants/timer-status";

export const TaskList = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectorTaskList);
    const times = useSelector(selectorSumOfTime);
    const status = useSelector(selectorTimerStatus);

    const minutesToHours = (time: number) => {
        const minutes = time % 60 > 0 ? `${time % 60} m` : '';
        const hours = (time - (time % 60)) / 60 > 0 ? `${(time - (time % 60)) / 60} h` : '';
        return `${hours ? hours + ' ' : ''}${minutes || ''}`
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination
            || (result.destination.index === 0 && [TimerStatusEnum.IN_PROGRESS, TimerStatusEnum.PAUSE].includes(status))) {
            return;
        }

        dispatch(timerAction.reorder({
            startIndex: result.source.index,
            endIndex: result.destination.index,
        }));
    }

    return (
        <>
            <Box mt='25px'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {list.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                        isDragDisabled={index === 0 && [TimerStatusEnum.IN_PROGRESS, TimerStatusEnum.PAUSE].includes(status)}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskItem key={item.id} {...item} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
            <Typography>{minutesToHours(times)}</Typography>
        </>
    )
}