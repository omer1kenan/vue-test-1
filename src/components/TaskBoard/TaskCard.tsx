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
  emits: ['drag-start', 'context-open'],
  data() {
    return {
      isDragging: false,
      startY: 0
    };
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
    },
    handleContextMenu(e: MouseEvent) {
      e.preventDefault();
      this.$emit('context-open', {
        taskId: this.task.id,
        x: e.clientX,
        y: e.clientY
      });
    },
    handleDragStart(e: DragEvent) {
      if (!e.currentTarget) return;
      e.stopPropagation();
      this.$emit('drag-start', this.task.id, e);
      (e.currentTarget as HTMLElement).classList.add('dragging');
    },
    handleDragEnd(e: DragEvent) {
      if (e.currentTarget) {
        (e.currentTarget as HTMLElement).classList.remove('dragging');
      }
    },
    handleTouchStart(e: TouchEvent) {
      if (!e.currentTarget) return;
      this.isDragging = true;
      this.startY = e.touches[0].clientY;
      (e.currentTarget as HTMLElement).classList.add('dragging');
    },
    handleTouchMove(e: TouchEvent) {
      if (!this.isDragging || !e.currentTarget) return;
      const y = e.touches[0].clientY;
      if (Math.abs(y - this.startY) > 10) {
        const dragEvent = new DragEvent('dragstart', {
          dataTransfer: new DataTransfer()
        });
        dragEvent.dataTransfer?.setData('text/plain', this.task.id.toString());
        this.$emit('drag-start', this.task.id, dragEvent);
      }
    },
    handleTouchEnd(e: TouchEvent) {
      this.isDragging = false;
      if (e.currentTarget) {
        (e.currentTarget as HTMLElement).classList.remove('dragging');
      }
    }
  },
  render() {
    const color = this.getStatusColor(this.task.state);
    const icon = this.getStatusIcon(this.task.state);
    const timeAgo = this.getTimeAgo(this.task.createdAt);

    return (
      <div
        class={`task-card task-${color}`}
        draggable="true"
        onDragstart={this.handleDragStart}
        onDragend={this.handleDragEnd}
        onTouchstart={this.handleTouchStart}
        onTouchmove={this.handleTouchMove}
        onTouchend={this.handleTouchEnd}
        onContextmenu={this.handleContextMenu}
      >
        <h4>{icon} {this.task.title}</h4>
        <p>{this.task.description}</p>
        <span class="task-date">{timeAgo}</span>
      </div>
    );
  }
});
