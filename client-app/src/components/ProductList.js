import React, { useState, useReducer, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Modal from './ProductModal';
import {
    productReducer,
    DELETE_PRODUCT, GET_ALL_PRODUCT, LOADING, ERROR
}from '../context/productReducer';
import { productService } from '../services/service';

const initialState = {
    products: [],
    loading: false,
    error: false
}

function ProductList() {
    const [state, dispatch] = useReducer(productReducer, initialState);
    const [isShow, setIsShow] = useState(false);
    const [productId, setProductId] = useState(0);

    useEffect(() => {
        loadProducts();
    }, []);

    function deleteProduct(productId) {
        return productService.delete(productId)
            .then((response) => {
                if (response.ok) {
                    dispatch({ type: DELETE_PRODUCT, payload: state.products.filter(x => x.productId !== productId) });
                }
                return response;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getProduct(productId) {
        setProductId(productId);

        return productService.get(productId)
                .then((data) => {
                    handleGetResponse(data);
                })
                .catch((error) => {
                    dispatch({ type: ERROR });
                });
    }

    function loadProducts() {

        dispatch({ type: LOADING, payload: [] });

        productService.getAll()
            .then((data) => {
                dispatch({ type: GET_ALL_PRODUCT, payload: data.results});
            })
            .catch((error) => {
                dispatch({ type: ERROR });
            });
    }

    function onSubmit(data) {
        data["dateCreated"] = new Date().toISOString();
        data["productId"] = productId;

        let jsonData = JSON.stringify(data);
        let promiseService = (productId === 0) ? productService.create(jsonData) : productService.update(productId, jsonData)

        return promiseService
            .then((e)=> {
                closeForm();
                loadProducts();
            })
            .catch((error) => {
                dispatch({ type: ERROR });
            });
    }

    // form validation rules
    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required'),
        code: Yup.string().required('Code is required'),
        price: Yup.number().required('Price is required'),
        quantity: Yup.number().required('Quantity is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function handleGetResponse(data) {
        const fields = ['productName', 'code', 'price', 'quantity'];
        fields.forEach(field => setValue(field, data[field]));
    }

    function addProduct() {
        reset();
        setIsShow(true);
    }

    function updateProduct(productId) {
        reset();
        setIsShow(true);
        getProduct(productId);
    }

    function closeModal(e) {
        e.preventDefault();
        setIsShow(false);
    }

    function closeForm() {
        setIsShow(false);
    }

    return (
        <div className="container">
            <h1>Product </h1>

            <Button  className="btn btn-sm btn-success mb-2" onClick={() => addProduct()}>
                Add Product
            </Button>

            <Table>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Code</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { state.products.length > 0 && state.products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.code}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <Button className="btn btn-sm btn-primary mb-2"
                                    onClick={() => updateProduct(product.productId)}>Update
                                </Button>

                                &nbsp;&nbsp;
                                <Button className="btn btn-sm btn-danger mb-2"
                                    onClick={() => deleteProduct(product.productId)}>Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                     {/* Loading  */}
                    { state.loading &&
                    <tr>
                        <td colSpan="6" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                    }

                    {/* Error  */}
                    { state.error &&
                    <tr>
                        <td colSpan="6" className="text-center">
                            <div className="p-2">System failed</div>
                        </td>
                    </tr>
                    }

                    {/* Empty  */}
                    { !state.loading && ! state.error && state.products && state.products.length === 0 &&
                    <tr>
                        <td colSpan="6" className="text-center">
                            <div className="p-2">No products available</div>
                        </td>
                    </tr>
                    }
                </tbody>
            </Table>

            <Modal show={isShow} handleClose={e => this.modalClose(e)}>
                <form onSubmit={handleSubmit(onSubmit)} onReset={reset} className="product-form">
                    <h4>{(productId === 0) ? 'Add Product' : 'Edit Product'}</h4>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input id="name" name="productName" type="text" ref={register} className={`form-control ${errors.productName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.productName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label >Code</label>
                            <input id="code" name="code" type="text" ref={register} className={`form-control ${errors.code ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.code?.message}</div>
                        </div>
                        <div className="form-group">
                            <label >Price</label>
                            <input id="price "name="price" type="text" ref={register} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.price?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input id="quantity" name="quantity" type="text" ref={register} className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.quantity?.message}</div>
                        </div>
                    </div>
                    <div className="form-group btn-margin" >
                        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        &nbsp;
                        <button className="btn btn-link" onClick={e => closeModal(e)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export { ProductList };