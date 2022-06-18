import React, { Component } from "react";
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import TodoListDialog from "../components/TodoListDialog";
import TableTodoList from "../components/TableTodoList";
import { EventBus } from "../EventBus";

class TodoList extends Component{
	constructor() {
    super();
    this.state = {
      todoListData : localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')) : [],
      todoList : ''
    };
  }

  _handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.addTodoList(event);
    }
  }

  addTodoList = (event) => {
    event.preventDefault();
    let todoLists = this.state.todoListData;

    todoLists.push({
      name : this.state.todoList,
      complete : false
    })

    this.setState({
      todoListData : todoLists,
      todoList : ''
    })

    localStorage.setItem('todo-list', JSON.stringify(this.state.todoListData));
  }

  setTodoList = (event) => {
    event.preventDefault();
    this.setState({
      todoList : event.target.value
    })
  }

  showData = (todoListItem) => {
    this.setState({
      todoListData : todoListItem
    })

    localStorage.setItem('todo-list', JSON.stringify(todoListItem));
  }

  saveData = (payload) => {
    let selectedData = this.state.todoListData[payload.index];
    selectedData.name = payload.name;

    localStorage.setItem('todo-list', JSON.stringify(this.state.todoListData));
    this.showData(this.state.todoListData)
  }

	render(){
    EventBus.$on('save-updated-todo', (payload) => {
      this.saveData(payload)
    })

    EventBus.$on('show-data', (todoListItem) => {
      this.showData(todoListItem)
    })
		return (
			<div 
				className='content'
				>
				<Container>
					<Row 
						className="justify-content-md-center"
						>
						<Col 
							xs 
							lg="4"
							>
							<InputGroup 
								className="mb-3"
								>
								<FormControl
									placeholder="Create Todo List"
									aria-label="Create Todo List"
									aria-describedby="basic-addon2"
                  value={this.state.todoList}
                  onChange={this.setTodoList}
                  onKeyDown={this._handleKeyDown}
									/>
								<Button 
									variant="primary" 
									id="button-addon2"
                  onClick={this.addTodoList}
									>
									Save
								</Button>
							</InputGroup>
						</Col>
					</Row>
					<Row
						className="justify-content-md-center"
						>
						<Col>
							<TableTodoList
                todoListData={this.state.todoListData}
                ></TableTodoList>
						</Col>
					</Row>
          <TodoListDialog
            >
          </TodoListDialog>
				</Container>
			</div>
		);
	}
}

export default TodoList;