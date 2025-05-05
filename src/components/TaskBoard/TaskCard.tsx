import { defineComponent } from 'vue';
import { type Task, TaskState } from '../../model/task';
import '../../Styles/TaskCard.css';

export default defineComponent({
  name: 'TaskCard',
  props: {
    task: {
      type: Object as () => Task,
      required: true
    }
  },
  methods: {
    getStatusColor(state: TaskState): string {
      switch (state) {
        case TaskState.TODO: return 'blue';
        case TaskState.IN_PROGRESS: return 'orange';
        case TaskState.DONE: return 'green';
        default: return 'gray';
      }
    },
    getStatusIcon(state: TaskState): string {
      switch (state) {
        case TaskState.TODO: return '📝';
        case TaskState.IN_PROGRESS: return '⏳';
        case TaskState.DONE: return '✅';
        default: return '❓';
      }
    },
    getTimeAgo(date: Date): string {
      const now = new Date();
      const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`;
    }
  },
  render() {
    const color = this.getStatusColor(this.task.state);
    const icon = this.getStatusIcon(this.task.state);
    const timeAgo = this.getTimeAgo(this.task.createdAt);

    return (
      <div class={`task-card task-${color}`}>
        <h4>{icon} {this.task.title}</h4>
        <p>{this.task.description}</p>
        <span class="task-date">{timeAgo}</span>
      </div>
    );
  }
});