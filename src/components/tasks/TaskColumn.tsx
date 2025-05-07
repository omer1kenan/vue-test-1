import { defineComponent } from 'vue'
import { type Task, TaskState } from '../../model/task'
import TaskCard from './TaskCard'
import { useDragAndDrop } from '../../composables/useDragAndDrop'
import '../../styles/components/TaskColumn.css'

export default defineComponent({
  name: 'TaskColumn',
  components: { TaskCard },
  props: {
    title: { type: String, required: true },
    tasks: { type: Array as () => Task[], required: true },
    state: { type: String as () => TaskState, required: true }
  },
  emits: ['taskDrop', 'contextMenu'],
  setup(props, { emit }) {
    const { handleDragOver, handleDrop } = useDragAndDrop()

    const onDrop = (e: DragEvent) => {
      handleDrop(e, (taskId) => emit('taskDrop', taskId, props.state))
    }

    return () => (
      <div
        class="task-column"
        onDragover={handleDragOver}
        onDrop={onDrop}
      >
        <h3>{props.title}</h3>
        <div class="task-list">
          {props.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onContextMenu={(e: MouseEvent) => emit('contextMenu', {
                taskId: task.id,
                x: e.clientX,
                y: e.clientY
              })}
            />
          ))}
        </div>
      </div>
    )
  }
})