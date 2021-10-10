import React, { useState, useReducer, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import ProductModal from './ProductModal';
import {
    productReducer,
    DELETE_PRODUCT, GET_ALL_PRODUCT, LOADING, ERROR
}from '../context/productReducer';
import { productService } from '../services/service';
import { ProductItem } from './Product';
import ProductContext from '../context/productContext';
import ProductModalContext from '../context/productModalContext';


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
        let promiseService = (productId === 0) ? productService.create(jsonData) : productService.update(productId, jsonData);

        return promiseService
            .then((e)=> {
                closeModal();
                loadProducts();
            })
            .catch((error) => {
                dispatch({ type: ERROR });
            });
    }

    function addProduct() {
        setProductId(0);
        setIsShow(true);
    }

    function updateProduct(productId) {
        setProductId(productId);
        setIsShow(true);
    }

    function closeModal() {
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
                        <ProductContext.Provider
                            value={{
                                product: product,
                                delete: deleteProduct,
                                update: updateProduct,
                            }} key={index}>
                            <ProductItem/>
                        </ProductContext.Provider>
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

            <ProductModalContext.Provider
                value={{
                    isShow: isShow,
                    productId: productId,
                    onSubmit: onSubmit,
                    closeModal: closeModal
                }}>
                <ProductModal/>
            </ProductModalContext.Provider>
        </div>
    );
}

export { ProductList };