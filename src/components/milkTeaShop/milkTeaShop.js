import React, { useEffect, useState } from 'react'
import './milkTeaShop.css'
import { NavLink } from 'react-router-dom'
import dataProduct from './product.json'
const MilkTeaShop = () => {
    const [data, setData] = useState([])
    const [store, setStore] = useState([])
    const [openTopping, setOpenTopping] = useState(false)
    useEffect(() => {
        setData(dataProduct.product)
        setStore(dataProduct.store)
    }, [])

    const handleOpenTopping = () => {
        if (openTopping === true) {
            return setOpenTopping(false)
        }
        setOpenTopping(true);

    }
    return (
        <div className='milkTea-page'>
            <div className='row'>
                <div className='content-left col-2'>
                    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ height: '100%' }}>
                        <a href="/" class="d-flex align-items-center justify-content-center text-white text-decoration-none">
                            <span class="fs-4">Milk Tea Shop</span>
                        </a>
                        <hr />
                        <ul class="nav nav-pills flex-column mb-auto align-items-center">
                            {store.map((item, index) => {
                                return (
                                    <NavLink>{item.name}</NavLink>
                                )

                            })}

                        </ul>
                        <hr />
                    </div>
                </div>
                <div className='content-right col-10'>
                    <h1 className='text-center my-5'>Store 1 Menu</h1>
                    <div className='actions d-flex justify-content-between'>
                        <button className='btn btn-primary w-25'
                            onClick={() => { handleOpenTopping() }}
                        >Filter</button>
                        <div className='d-flex ' style={{ marginRight: '150px' }}>
                            <label className='me-5 d-flex align-items-center' style={{ width: '100px' }}>Sort By</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Choose option</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    {openTopping &&
                        <div className='toppings mt-3'>
                            <h3>Topping:</h3>
                            <ul className="d-flex justify-content-between list-unstyled flex-wrap ms-5 me-5">
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                                <li>
                                    <input type='checkbox' /> Milk Foarm
                                </li>
                            </ul>
                        </div>
                    }

                    <div className='container-product d-flex flex-wrap mt-5'>
                        {data.map((item, index) => {
                            return (
                                <div className='content-product w-25 me-5 ms-3'>
                                    <div class="card mb-4 rounded-3 shadow-sm">
                                        <div class="card-header py-3">
                                            <h4 class="my-0 ">MT-0{index + 1}</h4>
                                            <h3>{item.name}</h3>
                                        </div>
                                        <div class="card-body">
                                            <ul class="list-unstyled mt-3 mb-4">
                                                <li>Toppings:</li>
                                                <li>{item.toppings}</li>
                                                <div className='d-flex justify-content-between'>
                                                    <li></li>
                                                    <li>{item.price}</li>
                                                </div>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MilkTeaShop;