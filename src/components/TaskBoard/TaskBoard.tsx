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
    return {
      TaskState,
      getTasksByState: filterTasksByState
    };
  },
  render() {
    return (
      <div class="task-board">
        <h2>Workshop Task Board</h2>
        <div class="board-columns">
          <TaskColumn
            title="To Do"
            tasks={this.getTasksByState(TaskState.TODO)}
          />
          <TaskColumn
            title="In Progress"
            tasks={this.getTasksByState(TaskState.IN_PROGRESS)}
          />
          <TaskColumn
            title="Done"
            tasks={this.getTasksByState(TaskState.DONE)}
          />
        </div>
      </div>
    );
  }
});