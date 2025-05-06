// TaskBoard.tsx
import { defineComponent } from 'vue';
import TaskColumn from './TaskColumn';
import { TaskState } from '../../model/task';
import { useTasks } from '../tasks/useTasks'; // جديد
import '../../Styles/TaskBoard.css';

export default defineComponent({
  name: 'TaskBoard',
  components: { TaskColumn },
  setup() {
    const {
      getTasksByState,
      handleTaskDrop,
      handleDragStart
    } = useTasks();

    return {
      TaskState,
      getTasksByState,
      handleTaskDrop,
      handleDragStart
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