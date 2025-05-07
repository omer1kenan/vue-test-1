import { defineComponent, type PropType } from 'vue'
import { TaskState } from '../../model/task'

export default defineComponent({
    name: 'TaskContextMenu',
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        taskId: {
            type: Number,
            required: true
        },
        position: {
            type: Object as PropType<{ x: number; y: number }>,
            required: true
        },
        onClose: {
            type: Function as PropType<() => void>,
            required: true
        },
        onSelect: {
            type: Function as PropType<(state: TaskState, taskId: number) => void>,
            required: true
        }
    },
    setup(props) {
        return () => (
            props.visible && (
                <div
                    class="context-menu"
                    style={{
                        top: `${props.position.y}px`,
                        left: `${props.position.x}px`,
                        position: 'fixed',
                        zIndex: 1000
                    }}
                >
                    <div class="menu-item" onClick={() => props.onSelect?.(TaskState.TODO, props.taskId)}>
                        📝 To Do
                    </div>
                    <div class="menu-item" onClick={() => props.onSelect?.(TaskState.IN_PROGRESS, props.taskId)}>
                        ⏳ In Progress
                    </div>
                    <div class="menu-item" onClick={() => props.onSelect?.(TaskState.DONE, props.taskId)}>
                        ✅ Done
                    </div>
                </div>
            )
        )
    }
})