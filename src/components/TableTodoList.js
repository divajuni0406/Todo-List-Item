import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react'
import { EventBus } from '../EventBus';

const TableTodoList = (props) => {
	const [todoListItem, setTodoListItem] = useState([]);

	useEffect(() => {
		setTodoListItem(props.todoListData);
	}, [props.todoListData]);

	const isComplete = (index, status) => {
		let todoListData = todoListItem[index];
		todoListData.complete = status;
		todoListData = todoListItem;

		EventBus.$emit('show-data', todoListItem);
	}

	const deleteTodoList = (index) =>{
		confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
						let data = todoListItem;
						data.splice(index, 1);

						setTodoListItem(data);
						EventBus.$emit('show-data', todoListItem);
					}
        },
        {
          label: 'No',
          onClick: () => false
        }
      ]
    });
	}

	const showModal = async (index) => {
		let data = todoListItem[index];
		data.index = index;
		
		EventBus.$emit('show-data-dialog', data);
	};

	return (
		<>
			<Table 
				striped 
				bordered 
				hover
				>
				<thead
					>
					<tr>
						<th className='text-center'>#</th>
						<th>Todo List Name</th>
						<th className='text-center' colSpan={3}>Action</th>
					</tr>
				</thead>
				<tbody>
					{ 
						todoListItem.map((todoList, index) => {
							let payload = {
								status : true,
								color : 'success',
								name : 'Complete'
							}
							
							if(todoList.complete){
								payload.status = false;
								payload.color = 'danger';
								payload.name = 'Cancel';
							}
							
							return <tr
								key={index}
								>
								<td className='text-center'>{ index + 1 }</td>
								<td>{ todoList.name } {todoList.complete ? <FontAwesomeIcon icon="fa-solid fa-check" /> : ''}</td>
								<td className='text-center'><Button variant={payload.color} onClick={() => isComplete(index, payload.status)}>{payload.name}</Button></td>
								<td className='text-center'><Button variant="secondary" onClick={() => showModal(index)}>Edit</Button></td>
								<td className='text-center'><Button variant="danger" onClick={() => deleteTodoList(index)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Button></td>
							</tr>
						})	
					}
				</tbody>
			</Table>
		</>
	);
}

export default TableTodoList