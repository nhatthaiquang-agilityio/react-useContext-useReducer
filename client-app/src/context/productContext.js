import { createContext } from "react";

const ProductContext = createContext({
    product: {},
    delete: () => {},
    update: () => {},
    onSubmit: () => {}
});

export default ProductContext;
