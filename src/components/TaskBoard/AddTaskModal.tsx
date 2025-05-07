// components/AddTaskModal.tsx
import { defineComponent, ref } from 'vue';
import { TaskState } from '../../model/task';

export default defineComponent({
    name: 'AddTaskModal',
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close', 'add-task'],
    setup(props, { emit }) {
        const title = ref('');
        const description = ref('');

        const handleSubmit = () => {
            if (title.value.trim()) {
                emit('add-task', {
                    title: title.value,
                    description: description.value,
                    state: TaskState.TODO
                });
                resetForm();
                emit('close');
            }
        };

        const resetForm = () => {
            title.value = '';
            description.value = '';
        };

        const handleClose = () => {
            resetForm();
            emit('close');
        };

        return {
            title,
            description,
            handleSubmit,
            handleClose
        };
    },
    render() {
        if (!this.show) return null;

        return (
            <teleport to="body">
                <div class="modal-overlay" onClick={this.handleClose}>
                    <div class="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Add New Task</h3>
                        <form onSubmit={e => { e.preventDefault(); this.handleSubmit(); }}>
                            <div class="form-group">
                                <label for="title">Title*</label>
                                <input
                                    id="title"
                                    type="text"
                                    v-model={this.title}
                                    placeholder="Task title"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea
                                    id="description"
                                    v-model={this.description}
                                    placeholder="Task description"
                                />
                            </div>
                            <div class="modal-actions">
                                <button type="button" onClick={this.handleClose}>
                                    Cancel
                                </button>
                                <button type="submit">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </teleport>
        );
    }
});