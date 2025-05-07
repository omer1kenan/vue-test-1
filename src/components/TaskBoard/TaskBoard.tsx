// TaskBoard.tsx
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import TaskColumn from './TaskColumn';
import { TaskState } from '../../model/task';
import TaskContextMenu from './TaskContextMenu';
import { initialTasks, getTasksByState } from '../../data/tasks';
import '../../Styles/TaskBoard.css';
import AddTaskModal from './AddTaskModal';

export default defineComponent({
  name: 'TaskBoard',
  components: { TaskColumn, TaskContextMenu, AddTaskModal },
  setup() {
    const tasks = ref(initialTasks);
    const showModal = ref(false);

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
    const handleAddTask = (newTask: { title: string; description: string }) => {
      tasks.value.push({
        id: Math.max(0, ...tasks.value.map(t => t.id)) + 1,
        title: newTask.title,
        description: newTask.description,
        state: TaskState.TODO,
        createdAt: new Date()
      });
    };


    return {
      TaskState,
      getTasksByState: filterTasksByState,
      handleTaskDrop,
      handleContextOpen,
      contextMenu,
      handleContextAction,
      showModal,
      handleAddTask
    };
  },
  render() {
    return (
      <div class="task-board">
        <div class="board-header">
          <h2>Workshop Task Board</h2>
          <button onClick={() => this.showModal = true}>Add Task</button>
        </div>
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
        <AddTaskModal
          show={this.showModal}
          onClose={() => this.showModal = false}
          onAdd-task={this.handleAddTask}
        />
      </div>
    );
  }
});