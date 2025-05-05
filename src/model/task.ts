export enum TaskState {
    TODO = 'todo',
    IN_PROGRESS = 'in-progress',
    DONE = 'done'
}

export interface Task {
    id: number;
    title: string;
    description: string;
    state: TaskState;
    createdAt: Date;
}