import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import ProductContext from '../context/productContext';

function ProductItem() {
    const context = useContext(ProductContext);
    console.log("Product item", context.product.productId);

    return (
        <>
            <tr>
                <td>{context.product.productId}</td>
                <td>{context.product.productName}</td>
                <td>{context.product.code}</td>
                <td>{context.product.price}</td>
                <td>{context.product.quantity}</td>
                <td>
                    <Button className="btn btn-sm btn-primary mb-2"
                        onClick={() => context.update(context.product.productId)}>Update
                    </Button>

                    &nbsp;&nbsp;
                    <Button className="btn btn-sm btn-danger mb-2"
                        onClick={() => context.delete(context.product.productId)}>Delete
                    </Button>
                </td>
            </tr>
        </>
    )
}

export { ProductItem };