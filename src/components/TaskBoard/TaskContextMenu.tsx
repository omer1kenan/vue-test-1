import { defineComponent, type PropType, type CSSProperties } from 'vue';
import { TaskState } from '../../model/task';
import '../../Styles/ContextMenu.css';

export default defineComponent({
    name: 'TaskContextMenu',
    props: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        visible: { type: Boolean, required: true },
        taskId: { type: Number, required: true },
        onSelect: Function as PropType<(newState: TaskState, taskId: number) => void>
    },
    setup(props) {
        const handleClick = (state: TaskState, e: MouseEvent) => {
            e.stopPropagation();
            props.onSelect?.(state, props.taskId);
        };

        return () => {
            if (!props.visible) return null;

            const menuStyle: CSSProperties = {
                position: 'absolute',
                top: `${props.y}px`,
                left: `${props.x}px`,
                zIndex: 1000,
            };

            return (
                <ul class="context-menu" style={menuStyle}>
                    <li role="button" tabindex="0" onMousedown={(e) => handleClick(TaskState.TODO, e)}>Move to To Do</li>
                    <li role="button" tabindex="0" onMousedown={(e) => handleClick(TaskState.IN_PROGRESS, e)}>Move to In Progress</li>
                    <li role="button" tabindex="0" onMousedown={(e) => handleClick(TaskState.DONE, e)}>Move to Done</li>
                </ul>
            );
        };
    }
});