import './App.css';
import TodoList from './view/TodoList';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
  return (
    <div>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
