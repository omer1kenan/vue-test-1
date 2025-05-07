import { defineComponent } from 'vue';
import { type Task, TaskState } from '../../model/task';
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
    },
    state: {
      type: String as () => TaskState,
      required: true
    }
  },
  emits: ['task-drop', 'context-open'],
  methods: {
    handleDragOver(e: DragEvent) {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
      (e.currentTarget as HTMLElement).classList.add('dragover');
    },
    handleDragLeave(e: DragEvent) {
      (e.currentTarget as HTMLElement).classList.remove('dragover');
    },
    handleDrop(e: DragEvent) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).classList.remove('dragover');
      if (!e.dataTransfer) return;
      const taskId = parseInt(e.dataTransfer.getData('text/plain'));
      if (!isNaN(taskId)) {
        this.$emit('task-drop', {
          taskId,
          newState: this.state
        });
      }
    },
    handleContextOpen(payload: { taskId: number; x: number; y: number }) {
      this.$emit('context-open', payload);
    }
  },
  render() {
    return (
      <div
        class="task-column"
        onDragover={this.handleDragOver}
        onDragleave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <h3>{this.title}</h3>
        <div class="task-list">
          {this.tasks.map(task => (
            <TaskCard
              task={task}
              key={task.id}
              onDrag-start={(taskId: number, e: DragEvent) => {
                if (e.dataTransfer) {
                  e.dataTransfer.setData('text/plain', taskId.toString());
                  e.dataTransfer.effectAllowed = 'move';
                }
              }}
              onContext-open={this.handleContextOpen}
            />
          ))}
        </div>
      </div>
    );
  }
});
