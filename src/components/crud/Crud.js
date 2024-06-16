import React, { useEffect, useState } from 'react'
import './Crud.css';
import dataJson from './data.json'
const CRUD = () => {
    const [data, setData] = useState([]);
    const [task, setTask] = useState();
    const [priority, setPriority] = useState();
    const [stateModal, setStateModal] = useState(false)
    const [action, setAction] = useState()
    const [id, setId] = useState()
    useEffect(() => {
        setData(dataJson['list-task'])
    }, [])
    const handleOpenModal = () => {
        setStateModal(true)
        setAction('Add')
    }
    const handleAddTask = () => {
        const newTask = {
            id: data.length + 1,
            task: task,
            priority: priority,
            state: 'to do'
        }
        setData([...data, newTask])
        setTask('');
        setPriority(null)
    }
    const handleClose = () => {
        setStateModal(false)
        setTask('')
        setId(null)
        setPriority(null)

    }

    const handleEditTask = (item) => {
        setAction("Edit")
        setStateModal(true)
        setTask(item.task)
        setPriority(item.priority)
        setId(item.id)

    }
    const confirmEditTask = () => {
        const coppyListTask = [...data];
        const editTask = {
            task: task,
            priority: priority,
            state: 'todo'
        }
        const index = coppyListTask.findIndex(item => item.id === id)
        coppyListTask[index] = editTask;
        setData(coppyListTask)
        setTask('')
        setId(null)
        setPriority(null)
    }
    return (
        <div className='container bg-light'>
            <div className='header d-flex justify-content-between'>
                <h1>Task list</h1>
                <button onClick={() => handleOpenModal()}>+ Add task</button>
            </div>
            <div className='container-task-list'>
                <div class={`${stateModal ? 'd-block' : 'd-none'} modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalSheet`}>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content rounded-4 shadow">
                            <div class="modal-header border-bottom-0">
                                <h1 class="modal-title fs-5">Add task</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                    handleClose()
                                }}></button>
                            </div>
                            <div class="modal-body px-4 py-0">
                                <label className='row'>Task</label>
                                <input className='row w-100 rounded-3' type='text' value={task} onChange={(event) => { setTask(event.target.value) }} />
                                <label className='row'>Prority</label>
                                <div>
                                    <button className={`me-2 btn border-danger ${priority === 'High' ? 'btn-danger' : 'btn-light'}`} onClick={() => { setPriority('High') }}>High</button>
                                    <button className={`me-2 btn border-warning ${priority === 'Medium' ? 'btn-warning' : 'btn-light'}`} onClick={() => { setPriority('Medium') }}>Medium</button>
                                    <button className={`btn border-success ${priority === 'Low' ? 'btn-success' : 'btn-light'}`} onClick={() => { setPriority('Low') }}>Low</button>
                                </div>

                            </div>
                            <div class="modal-footer d-flex justify-content-end w-100 gap-2 pb-3 border-top-0">
                                {action === 'Add' ?
                                    <button type="button" class="btn btn-lg btn-primary w-25" onClick={() => { handleAddTask() }}>
                                        Add
                                    </button> :
                                    <button type="button" class="btn btn-lg btn-primary w-25" onClick={() => { confirmEditTask() }}>
                                        Edit
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>
                {data.map((item, index) => {
                    return (
                        <div className='content-task bg-white mt-3 rounded-4 p-3'>
                            <tr className='row '>
                                <th className='col-3'>Task</th>
                                <th className='col-2'>Prority</th>
                            </tr>
                            <tr className='row '>
                                <td className='col-3'>{item.task}</td>
                                <td className='col-2'>{item.priority}</td>
                                <td className='col-2' style={{ marginTop: '-10px' }}>{item.state}</td>
                                <td className='col-2' style={{ marginTop: '-10px' }}></td>
                                <td className='col-2' style={{ marginTop: '-10px' }}>
                                    <button className='me-3' onClick={() => { handleEditTask(item, index) }} >Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CRUD