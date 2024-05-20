import { createAsyncThunk } from '@reduxjs/toolkit';
import {TaskStatus} from "../../../../entities/Task/module/types/taskStatus.ts";
import {ThunkConfig} from "../../../../app/providers/StoreProvider";
import {Task} from "../../../../entities/Task/module/types/task.ts";
import {toDoActions} from "../../../../entities/ToDo/model/slice/toDoSlice.ts";

interface UpdateTaskProps {
    taskId: string
    taskStatus: TaskStatus
    toDoId: string
    task: Task
    taskName?: string
}

type UpdatedTask = {
    toDoId: string,
    taskId: string,
    updatedTask: Task,
}

export const updateTask = createAsyncThunk<
    UpdatedTask,
    UpdateTaskProps,
    ThunkConfig<string>
>(
    'toDo/task/updateTask',
    async (newTaskData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const newTask = {
            name: newTaskData.taskName,
            taskId: newTaskData.taskId,
            status: newTaskData.taskStatus,
        };
        try {
            const response = await extra.api.patch<Task>('task/', newTask);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return { toDoId: newTaskData.toDoId, taskId: newTaskData.taskId, updatedTask: response.data };
        } catch (e: any) {
            if (!e) {
                dispatch(toDoActions.updateTask({
                    toDoId: newTaskData.toDoId,
                    taskId: newTaskData.taskId,
                    updatedTask: {
                        ...newTaskData.task,
                        name: newTaskData.taskName || newTaskData.task.name,
                        status: newTaskData.taskStatus,
                    },
                }));
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
