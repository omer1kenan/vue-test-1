import { defineComponent } from 'vue'
import { TaskBoard } from './components/tasks'
import './App.css'
import './Styles/main.css'

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

