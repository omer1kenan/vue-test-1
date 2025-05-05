import { defineComponent } from 'vue';
import { type Task } from '../../model/task';
import TaskCard from './TaskCard';

export default defineComponent({
  name: 'TaskColumn',
  components: { TaskCard },
  props: {
    title: {
      type: String,
      required: true
    },
    tasks: {
      type: Array as () => Task[],
      default: () => []
    }
  },
  render() {
    return (
      <div class="task-column">
        <h3>{this.title}</h3>
        <div class="task-list">
          {this.tasks.length > 0 ? (
            this.tasks.map(task => (
              <TaskCard task={task} key={task.id} />
            ))
          ) : (
            <p class="empty-state">No tasks found</p>
          )}
        </div>
      </div>
    );
  }
});