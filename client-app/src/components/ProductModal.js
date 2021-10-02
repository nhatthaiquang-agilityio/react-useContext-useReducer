import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ProductContext from "../context/productContext";
import { productService } from '../services/service';


function ProductModal() {
    const context = useContext(ProductContext);
    const showHideClassName = context.isShow ? "modal d-block" : "modal d-none";

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

    useEffect(() => {
        reset();

        if (context.productId !== 0) {
            productService.get(context.productId)
                .then((data) => {
                    const fields = ['productName', 'code', 'price', 'quantity'];
                    fields.forEach(field => setValue(field, data[field]));
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }
    }, [context.productId]);

    function close(e) {
        e.preventDefault();
        reset();
        context.closeModal();
    }

    function onSubmit(data) {
        context.onSubmit(data);
        reset();
    }
    return (
        <>
        <div className={showHideClassName} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <form onSubmit={handleSubmit(onSubmit)} onReset={reset} className="product-form">
                    <h4>{(context.productId === 0) ? 'Add Product' : 'Edit Product'}</h4>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input id="name" name="productName" type="text" ref={register}
                                className={`form-control ${errors.productName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.productName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label >Code</label>
                            <input id="code" name="code" type="text" ref={register}
                                className={`form-control ${errors.code ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.code?.message}</div>
                        </div>
                        <div className="form-group">
                            <label >Price</label>
                            <input id="price "name="price" type="text" ref={register}
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.price?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input id="quantity" name="quantity" type="text" ref={register}
                                className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.quantity?.message}</div>
                        </div>
                    </div>
                    <div className="form-group btn-margin" >
                        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        &nbsp;
                        <button className="btn btn-link" onClick={(e) => close(e)}>
                            Cancel
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductModal;