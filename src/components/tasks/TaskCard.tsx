import { defineComponent } from 'vue'
import { type Task, TaskState } from '../../model/task'
import { useDragAndDrop } from '@/composables/useDragAndDrop'
import '../../styles/components/TaskCard.css'

export default defineComponent({
  name: 'TaskCard',
  props: {
    task: { type: Object as () => Task, required: true }
  },
  emits: ['contextMenu'],
  setup(props, { emit }) {
    const { handleDragStart, handleDragEnd } = useDragAndDrop()

    const statusConfig = {
      [TaskState.TODO]: { color: 'blue', icon: '📝' },
      [TaskState.IN_PROGRESS]: { color: 'orange', icon: '⏳' },
      [TaskState.DONE]: { color: 'green', icon: '✅' }
    }

    const getTimeAgo = (date: Date) => {
      const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
      return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      emit('contextMenu', e)
    }

    return () => {
      const { color, icon } = statusConfig[props.task.state]

      return (
        <div
          class={`task-card task-${color}`}
          draggable="true"
          onDragstart={(e) => handleDragStart(e, props.task.id)}
          onDragend={handleDragEnd}
          onContextmenu={handleContextMenu}
        >
          <h4>{icon} {props.task.title}</h4>
          <p>{props.task.description}</p>
          <span class="task-date">{getTimeAgo(props.task.createdAt)}</span>
        </div>
      )
    }
  }
})