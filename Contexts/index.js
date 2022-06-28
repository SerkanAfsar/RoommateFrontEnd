import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [mode, setMode] = useState(false);

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);


    return (
        <AppContext.Provider value={{ mode, setMode }}>
            {children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;