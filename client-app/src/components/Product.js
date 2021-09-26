import React from 'react';
import { Button } from 'react-bootstrap';

function ProductItem(props) {
    return (
        <>
            <tr>
                <td>{props.product.productId}</td>
                <td>{props.product.productName}</td>
                <td>{props.product.code}</td>
                <td>{props.product.price}</td>
                <td>{props.product.quantity}</td>
                <td>
                    <Button className="btn btn-sm btn-primary mb-2"
                        onClick={() => props.updateProduct(props.product.productId)}>Update
                    </Button>

                    &nbsp;&nbsp;
                    <Button className="btn btn-sm btn-danger mb-2"
                        onClick={() => props.deleteProduct(props.product.productId)}>Delete
                    </Button>
                </td>
            </tr>
        </>
    )
}

export { ProductItem };