import { defineComponent, ref } from 'vue'
import { TaskState } from '../../model/task'
import { useTasks } from '../../composables/useTasks'
import TaskColumn from './TaskColumn'
import TaskContextMenu from './TaskContextMenu'
import AddTaskModal from '../shared/AddTaskModal';
import '../../styles/components/TaskBoard.css'


export default defineComponent({
  name: 'TaskBoard',
  components: { TaskColumn, TaskContextMenu, AddTaskModal },
  setup() {
    const {
      tasks,
      getTasksByState,
      updateTaskState,
      addTask
    } = useTasks()

    const showModal = ref(false)
    const contextMenu = ref({
      visible: false,
      taskId: null as number | null,
      position: { x: 0, y: 0 }
    })

    const handleContextMenu = (payload: { taskId: number; x: number; y: number }) => {
      contextMenu.value = {
        visible: true,
        taskId: payload.taskId,
        position: { x: payload.x, y: payload.y }
      }
    }

    const closeContextMenu = () => {
      contextMenu.value.visible = false
    }

    // دالة وسيطة لتعديل ترتيب البارامترات
    const handleContextAction = (state: TaskState, taskId: number) => {
      updateTaskState(taskId, state)
      closeContextMenu()
    }

    return () => (
      <div class="task-board">
        <div class="board-header">
          <h2>Workshop Task Board</h2>
          <button onClick={() => showModal.value = true}>Add Task</button>
        </div>

        <div class="board-columns">
          {Object.values(TaskState).map(state => (
            <TaskColumn
              key={state}
              title={state}
              tasks={getTasksByState.value(state)}
              state={state}
              onTaskDrop={updateTaskState}
              onContextMenu={handleContextMenu}
            />
          ))}
        </div>

        {contextMenu.value.visible && contextMenu.value.taskId !== null && (
          <TaskContextMenu
            visible={contextMenu.value.visible}
            taskId={contextMenu.value.taskId}
            position={contextMenu.value.position}
            onClose={closeContextMenu}
            onSelect={handleContextAction}
          />
        )}

        <AddTaskModal
          show={showModal.value}
          onClose={() => showModal.value = false}
          onAdd-task={addTask}
        />
      </div>
    )
  }
})