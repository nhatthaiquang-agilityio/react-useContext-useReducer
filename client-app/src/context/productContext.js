import { createContext } from "react";

const ProductContext = createContext({
    product: {},
    delete: () => {},
    update: () => {},
    onSubmit: () => {},
    closeModal: () => {},
    isShow: false,
    productId: 0
});

export default ProductContext;
