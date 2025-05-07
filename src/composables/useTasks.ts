import { ref, computed } from 'vue'
import { type Task, TaskState } from '../model/task'
import { initialTasks } from '@/data/tasks'

export function useTasks() {
    const tasks = ref<Task[]>(initialTasks)
    const draggedTaskId = ref<number | null>(null)

    const getTasksByState = computed(() => (state: TaskState) => {
        return tasks.value.filter(task => task.state === state)
    })

    const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'state'>) => {
        if (!task.title.trim()) return

        tasks.value.push({
            ...task,
            id: generateNewId(),
            state: TaskState.TODO,
            createdAt: new Date()
        })
    }

    const updateTaskState = (taskId: number, newState: TaskState) => {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) task.state = newState
    }

    const generateNewId = () => {
        return Math.max(0, ...tasks.value.map(t => t.id)) + 1
    }

    return {
        tasks,
        draggedTaskId,
        getTasksByState,
        addTask,
        updateTaskState
    }
}