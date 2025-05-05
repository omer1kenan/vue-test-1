import { type Task, TaskState } from '../model/task'
export const initialTasks: Task[] = [
    {
        id: 1,
        title: 'Setup Project',
        description: 'Initialize Vue project with TypeScript and TSX',
        state: TaskState.DONE,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 2,
        title: 'Reusable Components',
        description: 'Build reusable task components for the task board',
        state: TaskState.IN_PROGRESS,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 3,
        title: 'Styling',
        description: 'Implement CSS styles for the task board, to cover page for all screen sizes',
        state: TaskState.TODO,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 4,
        title: 'Composition API',
        description: 'Export task functionality to composition api and reuse it in task board.',
        state: TaskState.TODO,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 5,
        title: 'Drag and Drop',
        description: 'Implement drag and drop functionality for tasks',
        state: TaskState.TODO,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 6,
        title: 'Context Menu',
        description: 'Add context menu for tasks to select state. The task should \
         be moved to the selected state automatically.',
        state: TaskState.TODO,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 7,
        title: 'Implement Teleported Modal for New Task',
        description: 'Use Vue Teleport to render a modal outside the main task board component. ' +
            'The modal should allow users to enter task details and save the task to the "To Do" state. ' +
            'Ensure it closes when users click outside or choose to cancel.',
        state: TaskState.TODO,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 8,
        title: 'Validation',
        description: 'Make sure empty tasks cannot be added to the task board.',
        state: TaskState.TODO,
        createdAt: new Date('2024-04-08')
    },
    {
        id: 9,
        title: 'Testing',
        description: 'Add unit test, to ensure adding empy task is not possible, but adding task with data is possible.',
        state: TaskState.TODO,
        createdAt: new Date('2024-04-08')
    }
];


export const getTasksByState = (tasks: Task[], state: TaskState): Task[] => {
    return tasks.filter(task => task.state === state);
};