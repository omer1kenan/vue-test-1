import { defineComponent } from 'vue';
import { type Task } from '../../model/task';

export default defineComponent({
  name: 'TaskCard',
  props: {
    task: {
      type: Object as () => Task,
      required: true
    }
  },
  render() {
    return (
      <div class="task-card">
        <h4>{this.task.title}</h4>
        <p>{this.task.description}</p>
        <span class="task-date">
          {this.task.createdAt.toLocaleDateString()}
        </span>
      </div>
    );
  }
});