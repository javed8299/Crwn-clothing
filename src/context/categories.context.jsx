import { createContext, useEffect, useState } from "react";

import { getCategoriesAnDocuments } from "../utils/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categories = await getCategoriesAnDocuments()
            setCategoriesMap(categories);
        }
        getCategoriesMap()
    }, [])
    

    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}