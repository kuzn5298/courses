import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface TaskStatusOption {
  value: 'open' | 'in-progress' | 'done';
  status: TaskStatus;
  text: 'Open' | 'Working on it' | 'Completed';
}

export const TASK_STATUS_OPTIONS_TOKEN = new InjectionToken<TaskStatusOption[]>(
  'task-options'
);

export const TASK_STATUS_OPTIONS: TaskStatusOption[] = [
  {
    value: 'open',
    status: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    status: 'IN_PROGRESS',
    text: 'Working on it',
  },
  {
    value: 'done',
    status: 'DONE',
    text: 'Completed',
  },
];

export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS_TOKEN,
  useValue: TASK_STATUS_OPTIONS,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
