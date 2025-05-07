import { defineComponent, ref, watch } from 'vue';
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
        const titleError = ref('');
        const isFormValid = ref(false);

        watch([title, description], () => {
            validateForm();
        });

        const validateForm = () => {
            titleError.value = title.value.trim() ? '' : 'Title is required';
            isFormValid.value = !titleError.value;
        };

        const handleSubmit = () => {
            validateForm();
            if (isFormValid.value) {
                emit('add-task', {
                    title: title.value.trim(),
                    description: description.value.trim(),
                    state: TaskState.TODO
                });
                resetForm();
                emit('close');
            }
        };

        const resetForm = () => {
            title.value = '';
            description.value = '';
            titleError.value = '';
            isFormValid.value = false;
        };

        const handleClose = () => {
            resetForm();
            emit('close');
        };

        return {
            title,
            description,
            titleError,
            isFormValid,
            handleSubmit,
            handleClose,
            validateForm
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
                                    class={this.titleError ? 'invalid' : ''}
                                    onBlur={this.validateForm}
                                />
                                {this.titleError && <span class="error-message">{this.titleError}</span>}
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
                                <button
                                    type="submit"
                                    disabled={!this.isFormValid}
                                    class={!this.isFormValid ? 'disabled' : ''}
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </teleport>
        );
    }
});