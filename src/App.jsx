import { useState } from 'react'
import { RecoilRoot,useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { descriptionAtom, filterAtom, filteredTodosSelector, titleAtom, todoAtom } from './store/atoms/todos'


function App() {
  return (
    <div>
      <RecoilRoot>
        <Todos></Todos>
      </RecoilRoot>
    </div>
  )
}

function Todos(){
  return <div>
      <InputTodo></InputTodo>
      <TodoRenderer></TodoRenderer>
  </div>
}

function InputTodo(){
  const [title, setTitle] = useRecoilState(titleAtom); // using titleAtom to manage title
  const [description, setDescription] = useRecoilState(descriptionAtom); // using descriptionAtom to manage description
  const setFilter = useSetRecoilState(filterAtom); // using filterAtom to manage the filter input
  const [todos, setTodos] = useRecoilState(todoAtom);

    const addTodo = ()=> {
      const newTodo = {
        title,
        description,
      };
      setTodos([...todos,newTodo]);
    }

    return <div>
      <h1>Another todo app</h1>
      <div>
      <input type="text" placeholder='give title for todo'  onChange={(e)=> setTitle(e.target.value)}/><br></br>
      <input type="text" placeholder='give description for todos' onChange={(e)=> setDescription(e.target.value)}/><br></br>
      <button onClick={addTodo}>Add Todo</button>
      </div><br></br>
      <div>
      <input type="text" placeholder='enter filter' onChange={(e)=> setFilter(e.target.value)}/>
      </div><br></br>
    </div>
}

function TodoRenderer(){
  const todos = useRecoilValue(todoAtom)
  return <div>
    <h2>All todos</h2>
    {todos.map((todo)=>(
      <div>
      {todo.title} : {todo.description}
      </div>
    ))}
    <div>
    <FilteredTodoRenderer></FilteredTodoRenderer>
    </div>
  </div>
}

function FilteredTodoRenderer(){
  const filteredtodos = useRecoilValue(filteredTodosSelector);
  return <div>
    <h2>Filtered todos</h2>
    {filteredtodos.map((todo)=>(
      <div>
      {todo.title} : {todo.description}
      </div>
    ))}
  </div>
}

export default App
