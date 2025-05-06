import { defineComponent, ref } from 'vue';
import TaskColumn from './TaskColumn';
import { initialTasks, getTasksByState } from '../../data/tasks';
import { TaskState } from '../../model/task';
import '../../Styles/TaskBoard.css';

export default defineComponent({
  name: 'TaskBoard',
  components: { TaskColumn },
  setup() {
    const tasks = ref(initialTasks);

    const filterTasksByState = (state: TaskState) => {
      return getTasksByState(tasks.value, state);
    };


    const handleTaskDrop = ({ taskId, newState }: { taskId: number, newState: TaskState }) => {
      const task = tasks.value.find(t => t.id === taskId);
      if (task) task.state = newState;
    };
    const draggedTaskId = ref<number | null>(null);

    const handleDragStart = (taskId: number) => {
      draggedTaskId.value = taskId;
      document.querySelectorAll('.task-column').forEach(el => {
        el.setAttribute('data-dragged', taskId.toString());
      });
    };
    return {
      TaskState,
      getTasksByState: filterTasksByState,
      handleTaskDrop, handleDragStart
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
            />
          ))}
        </div>
      </div>
    );
  }
});