// composables/useTasks.ts
import { ref } from 'vue';
import { initialTasks, getTasksByState } from '../../data/tasks';
import { TaskState } from '../../model/task';

export function useTasks() {
    const tasks = ref(initialTasks);
    const draggedTaskId = ref<number | null>(null);

    const filterTasksByState = (state: TaskState) => {
        return getTasksByState(tasks.value, state);
    };

    const handleTaskDrop = ({ taskId, newState }: { taskId: number; newState: TaskState }) => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) task.state = newState;
    };

    const handleDragStart = (taskId: number) => {
        draggedTaskId.value = taskId;
        document.querySelectorAll('.task-column').forEach(el => {
            el.setAttribute('data-dragged', taskId.toString());
        });
    };

    return {
        tasks,
        draggedTaskId,
        getTasksByState: filterTasksByState,
        handleTaskDrop,
        handleDragStart
    };
}
