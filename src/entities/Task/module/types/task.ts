import {Update} from '@reduxjs/toolkit';
import {TaskStatus} from './taskStatus';
import {ToDo} from '@entities/ToDo';

export interface Task {
  _id: string;
  name: string;
  status: TaskStatus;
  todo: string;
  order: number;

  map?(
    param: (task: Task) => {changes: any; id: string} | null,
  ): Update<ToDo>[];
}
