import {useLocalStore , Observer} from 'mobx-react';
import React from 'react';
import Container from '@material-ui/core/Container';
import { Button, Paper } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeObservable,observable,computed,action, } from "mobx";
import { TextField } from '@material-ui/core';
import ReactDOM from 'react-dom'
import RenderCounter from 'react-render-counter';
import axios from 'axios';


/* const StoreContext = React.createContext();

const StoreProvider = ({children}) => {
  const store = useLocalStore(() => ({
    Todos: ["Learn React"],
    addTodo: (todo_thing) => {
      store.Todos.push(todo_thing);
    },
    get todoCount(){
      return store.Todos.length;
    }
  }));

  return(
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const Todoboard = observer(() =>{
  const store = React.useContext(StoreContext);
  return(
    <h1>There are {store.todoCount} things waited.</h1>
  )

})

const TodoList = observer(() => {
  const store = React.useContext(StoreContext);
  
  return(
    <ul>
      {store.Todos.map(todo_thing => (
      <li key={todo_thing}>{todo_thing}</li>
      ))}
    </ul>
  );
})

const TodoForm = () => {
  const store = React.useContext(StoreContext);
  const [todo_thing, addTodo] = React.useState("");
  return(
    <form
      onSubmit = { e => {
        store.addTodo(todo_thing);
        addTodo("");
        e.preventDefault();
      }}
      >
        <input type="text"
        value={todo_thing}
        onChange={ e => {
          addTodo(e.target.value);
        }}
        />
      
      <Button variant="contained" color="primary" type = "submit">
      Confirm
    </Button>
    </form>
  );
};

export default function Todo(){
  return (
    <Container maxWidth="sm" className="UserPage">
      <Paper>
        <StoreProvider>
          <main>
            <Todoboard />
            <TodoList />
            <TodoForm />
          </main>
        </StoreProvider>
      </Paper>
    </Container> 
  );
} */

class TodoStore{
  todos = [];
  newtodo = 'hello';

  constructor() {
    makeObservable(this, {
      todos: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
      showMyTodos: action,
      newtodo: observable
    });
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === false
    ).length;
  }

  get report() {
    return `There are ${this.completedTodosCount} todo(s) are waiting`;
    /* if (this.todos.length === 0)
      return "<none>";
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`; */
  }

  id() {
    return axios.get("http://localhost:8080/demo/id/2")
                .then((response) =>{
                console.log(response);
                         });
  }

  sort_todos(){
      this.todos.slice().sort(function(a,b){
            return b.issue_date-a.issue_date;
        });
  }


  showMyTodos(pid){
    var data_list;
    this.todos.length = 0;
    axios.get("http://localhost:8080/demo/prescription/"+pid)
         .then((response) =>{
         data_list = response.data;
         //console.log(data_list);
         //data_list.forEach(function(){
         for(const value of data_list){
                  this.todos.push({
                      task:value.content,
                      completed: value.status,
                      id: value.id,
                      issue_date: value.issue_date,
                      pid: value.pid,
                  });
         //    });
         }
    });
  }

  addTodo(task,pid) {

  const Todo_input = {
          pid: pid,
          issue_date: Math.floor(new Date().getTime()/1000),
          content: task,
          completed: false
      };
  //console.log(Todo_input);

    let param = new URLSearchParams();
    var issue_date = Math.floor(new Date().getTime()/1000);
    param.append("pid",pid);
    param.append("issue_date",issue_date);
    param.append("content",task);
    param.append("status",false);
    axios.post("http://localhost:8080/demo/addTodo",param)
         .then(response =>{
            if(response.data !=null){
                alert("Added Successfully");
                //console.log(response.issue_date)
                this.todos.push({
                          task: task,
                          completed: false,
                          id: response.data,
                          issue_date: issue_date,
                          pid: pid,
                        });
            }
         })
  }

  changeValue(value){
    this.newtodo = value;
  }

  set settodo(value){
    this.newtodo = value;
  }
}
//const todoStore = new TodoStore();
//todoStore.addTodo("read MobX tutorial");

const TodoList = observer(({store}) => {
  const onNewTodo = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const pid = queryParams.get('id');
      store.addTodo(prompt('Enter a new todo:','coffee plz'),pid);
  }

  const onhandleChange = (props) =>{
    store.changeValue(props.value);
  }

  const getid = () => {
    store.id();
  }

  const showMyTodos = () =>{
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    store.showMyTodos(id);
  }





  return (
    <div>
      { store.report }
      <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
      </ul>
      <Button variant="contained" color="primary" onClick={showMyTodos}>
      Show todo issues.
    </Button>
    <Button variant="contained" color="primary" onClick={onNewTodo}>
          Add a todo issue.
        </Button>
    </div>

  );
})


const TodoView = observer(({todo}) => {

  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
    //console.log(todo);

    let param = new URLSearchParams();
    param.append("pid",todo.pid);
    param.append("id",todo.id);
    param.append("status",todo.completed);
    param.append("issue_date",todo.issue_date);
    param.append("content",todo.task);

    axios.post("http://localhost:8080/demo/updateTodo",param)
         .then( response =>{
         if(response.data != null){
            alert("update successfully.");
         }
      })
  }

  return (
    <li>
      <input
        type='checkbox'
        checked={ todo.completed }
        onChange={ onToggleCompleted }
      />
      { todo.task }
      { todo.assignee
        ? <small>{ todo.assignee.name }</small>
        : null
      }
      
    </li>
  );
})



export default function User(){
  const Astore = new TodoStore();
  //Astore.addTodo("newone");
  //Astore.addTodo("newnewone");
  //const queryParams = new URLSearchParams(window.location.search);
  //let id = queryParams.get('id');
  //console.log(Astore.id());

//  const mytodos = () =>{
//      console.log(Astore.mytodos(id));
//  }
  return(
    <Paper>
      <main>
      < TodoList store = {Astore}/>

      </main>
    </Paper>
    );
    
    /* <Paper>
    <ul>
      {store.todos.map(home => <div>{home.task}</div>)}
    </ul>
    </Paper> */

};


/* function User(){
    return (
      <h2>User</h2>
    );
  }
  export default User; */  