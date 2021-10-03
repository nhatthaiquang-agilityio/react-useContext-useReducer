import { createContext } from "react";

const ProductModalContext = createContext({
    onSubmit: () => {},
    closeModal: () => {},
    isShow: false,
    productId: 0
});

export default ProductModalContext;
