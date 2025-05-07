import { mount } from '@vue/test-utils'
import TaskBoard from '@/components/TaskBoard.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { TaskState } from '@/model/task'

describe('TaskBoard Component', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(TaskBoard)
    })

    it('should not allow adding empty tasks', async () => {
        await wrapper.find('button').trigger('click')

        const addButton = wrapper.find('.modal-actions button[type="submit"]')
        expect(addButton.attributes('disabled')).toBeDefined()

        await wrapper.find('#title').setValue('   ')
        expect(addButton.attributes('disabled')).toBeDefined()

        expect(wrapper.find('.error-message').text()).toContain('Title is required')
    })

    it('should allow adding valid tasks', async () => {
        await wrapper.find('button').trigger('click')

        await wrapper.find('#title').setValue('Valid Task Title')
        await wrapper.find('#description').setValue('Valid Description')

        const addButton = wrapper.find('.modal-actions button[type="submit"]')
        expect(addButton.attributes('disabled')).toBeUndefined()

        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.vm.tasks).toContainEqual(
            expect.objectContaining({
                title: 'Valid Task Title',
                description: 'Valid Description',
                state: TaskState.TODO
            })
        )
    })
})