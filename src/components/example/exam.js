import React, { useEffect, useState } from "react";
import './exam.css'
import dataJson from './data1.json';
const TaskList = () => {
    const [openAddEmployee, setOpenAddEmployee] = useState(false);
    const [action, setAction] = useState()
    const [id, setId] = useState()
    const [data, setData] = useState([])
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [error, setError] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });
    useEffect(() => {
        setData(dataJson.employee)
    }, [])
    const handleOpenModal = () => {
        setAction("add")
        setOpenAddEmployee(true);
    }
    const handleAddNewEmployee = () => {
        if (Validate()) {
            const newEmployee = {
                id: data.length + 1,
                name: name,
                email: email,
                address: address,
                phone: phone
            }
            setData([...data, newEmployee])
            setName('');
            setEmail('');
            setAddress('');
            setPhone("")
        }
        else return;
    }

    const Validate = () => {
        const newError = {}
        let valid = true;
        if (!name) {
            newError.name = "Tên chưa được nhập"
            valid = false
        }
        if (!email) {
            newError.email = "Email chưa nhập"
            valid = false
        }
        else {
            let regx = /\S+@\S+\.\S+/;
            if (!regx.test(email)) {
                newError.email = "EMail không đúng định dạng";
                valid = false
            }
        }

        setError(newError);
        return valid;
    }
    const handleEdit = (item) => {
        setAction('edit')
        setId(item.id)
        setName(item.name);
        setEmail(item.email);
        setAddress(item.address);
        setPhone(item.phone)
    }
    const confirmEdit = () => {
        const dataCoppy = [...data];
        const index = dataCoppy.findIndex(item => item.id === id);
        const editEmployee = {
            id: data.length + 1,
            name: name,
            email: email,
            address: address,
            phone: phone
        }
        dataCoppy[index] = editEmployee;
        setData(dataCoppy)
        setName('');
        setEmail('');
        setAddress('');
        setPhone("")

    }

    const handleDelete = (employee) => {
        const datareset = data.filter(item => item.id != employee.id)
        setData(datareset);
    }
    return (
        <>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Employees</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i>
                                        <button onClick={() => handleOpenModal()}>Add New Employee</button>
                                    </a>
                                    <a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>
                                </div>
                            </div>
                        </div>
                        <div id="addEmployeeModal" className={`${openAddEmployee ? "d-block" : "d-none"}`}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form>
                                        <div className="modal-header">
                                            <h4 className="modal-title">Add Employee</h4>
                                            <button onClick={() => { setOpenAddEmployee(false) }} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" required value={name} onChange={(event) => { setName(event.target.value) }} />
                                            </div>
                                            {error.name && <div>{error.name}</div>}
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control" required value={email} onChange={(event) => { setEmail(event.target.value) }} />
                                            </div>
                                            {error.name && <div>{error.email}</div>}
                                            <div className="form-group">
                                                <label>Address</label>
                                                <textarea className="form-control" required value={address} onChange={(event) => { setAddress(event.target.value) }}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" required value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={() => { setOpenAddEmployee(false) }} >Cancel</button>
                                            {action === 'add' ?
                                                <button onClick={() => { handleAddNewEmployee() }}>Add</button>
                                                :
                                                <button onClick={() => { confirmEdit() }}>Edit</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll" />
                                            <label for="selectAll"></label>
                                        </span>
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <span className="custom-checkbox">
                                                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                                    <label for="checkbox1"></label>
                                                </span>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <button onClick={() => { handleEdit(item) }}>Edit</button>
                                                <button onClick={() => { handleDelete(item) }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul className="pagination">
                                <li className="page-item disabled"><a href="#">Previous</a></li>
                                <li className="page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                <li className="page-item"><a href="#" className="page-link">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" required value={name} onChange={(event) => { setName(event.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" required value={email} onChange={(event) => { setEmail(event.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea className="form-control" required value={address} onChange={(event) => { setAddress(event.target.value) }}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" className="form-control" required value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button>Cancel</button>
                                <button>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete these Records?</p>
                                <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-danger" value="Delete" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskList