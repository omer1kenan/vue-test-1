// TaskBoard.tsx
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import TaskColumn from './TaskColumn';
import { TaskState } from '../../model/task';
import TaskContextMenu from './TaskContextMenu';
import { initialTasks, getTasksByState } from '../../data/tasks';
import '../../Styles/TaskBoard.css';

export default defineComponent({
  name: 'TaskBoard',
  components: { TaskColumn, TaskContextMenu },
  setup() {
    const tasks = ref(initialTasks);

    const contextMenu = ref<{
      visible: boolean;
      taskId: number | null;
      x: number;
      y: number;
    }>({
      visible: false,
      taskId: null,
      x: 0,
      y: 0
    });

    const filterTasksByState = (state: TaskState) => {
      return getTasksByState(tasks.value, state);
    };

    const handleTaskDrop = ({ taskId, newState }: { taskId: number, newState: TaskState }) => {
      const task = tasks.value.find(t => t.id === taskId);
      if (task) task.state = newState;
    };

    const handleContextOpen = (payload: { taskId: number, x: number, y: number }) => {
      contextMenu.value = {
        visible: true,
        taskId: payload.taskId,
        x: payload.x,
        y: payload.y
      };
    };

    const handleContextClose = () => {
      contextMenu.value.visible = false;
    };

    const handleContextAction = (newState: TaskState, taskId: number) => {
      const task = tasks.value.find(t => t.id === taskId);
      if (task) {
        task.state = newState;
      }
      handleContextClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('.context-menu') == null) {
        handleContextClose();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      TaskState,
      getTasksByState: filterTasksByState,
      handleTaskDrop,
      handleContextOpen,
      contextMenu,
      handleContextAction
    };
  },
  render() {
    return (
      <div class="task-board">
        <h2>Workshop Task Board</h2>
        <div class="board-columns">
          {[TaskState.TODO, TaskState.IN_PROGRESS, TaskState.DONE].map(state => (
            <TaskColumn
              key={state}
              title={state.toString()}
              tasks={this.getTasksByState(state)}
              state={state}
              onTask-drop={this.handleTaskDrop}
              onContext-open={this.handleContextOpen}
            />
          ))}
        </div>

        {this.contextMenu.visible && this.contextMenu.taskId !== null && (
          <TaskContextMenu
            taskId={this.contextMenu.taskId}
            x={this.contextMenu.x}
            y={this.contextMenu.y}
            visible={this.contextMenu.visible}
            onSelect={this.handleContextAction}
          />
        )}
      </div>
    );
  }
});