import { defineComponent } from 'vue'
import { TaskBoard } from './components/TaskBoard'
import './App.css'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div class="app">
        <TaskBoard />
      </div>
    )
  }
})

