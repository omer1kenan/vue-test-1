import { ref } from 'vue'

export function useDragAndDrop() {
    const isDragging = ref(false)

    const handleDragStart = (e: DragEvent, taskId: number) => {
        e.dataTransfer?.setData('text/plain', taskId.toString())
        isDragging.value = true
    }

    const handleDragEnd = () => {
        isDragging.value = false
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: DragEvent, callback: (taskId: number) => void) => {
        e.preventDefault()
        const taskId = Number(e.dataTransfer?.getData('text/plain'))
        if (!isNaN(taskId)) callback(taskId)
    }

    return {
        isDragging,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop
    }
}