import { useSelector } from "react-redux";
import { selectorSumOfTime, selectorTaskList } from "../../../../store/task/selector";
import { TaskItem } from "./list-item";
import { Box, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { taskAction } from "../../../../store/task/task";

export const TaskList = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectorTaskList);
    const times = useSelector(selectorSumOfTime);

    const minutesToHours = (time: number) => {
        const minutes = time % 60 > 0 ? `${time % 60} m` : '';
        const hours = (time - (time % 60)) / 60 > 0 ? `${(time - (time % 60)) / 60} h` : '';
        return `${hours ? hours + ' ' : ''}${minutes || ''}`
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        dispatch(taskAction.reorder({
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
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
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