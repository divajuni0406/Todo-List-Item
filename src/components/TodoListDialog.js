import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react'
import { EventBus } from '../EventBus';

const TodoListDialog = () => {
  const [todoListName, setTodoListName] = useState('');
  const [todoListData, setTodoListData] = useState({});
  const [show, setShow] = useState(false);
 
  const handleTodoList = (event) => {
    event.preventDefault();
    setTodoListName(event.target.value)
  }

  const save = () => {
    todoListData.name = todoListName;
    EventBus.$emit('save-updated-todo', todoListData);
    close()
  }

  const close = () => {
    setShow(false);
  }

  EventBus.$on('show-data-dialog', (data) => {
    setShow(true);
    setTodoListName(data.name)
    setTodoListData(data)
  })

  return (
    <>
      <Modal 
        show={show} 
        onHide={close}
        >
        <Modal.Header 
          closeButton
          >
          <Modal.Title
            >
            Edit Todo List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          >
          <Form.Label
            >
            Todo List
          </Form.Label>
          <Form.Control
            placeholder='Please Create Todo List'
            value={todoListName ?? ""}
            onChange={handleTodoList}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={save}
            >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoListDialog