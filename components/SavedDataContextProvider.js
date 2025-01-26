import React, { createContext, useState } from "react"

export const SavedDataContext = createContext();

export function SavedDataContextProvider({ children }) {
    const [savedData, setSavedData] = useState({
        personal: {
            fname: "",
            lname: "",
            email: "",
            tel: "",
        },
        communication: {
            orderStatus: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false
        }
    });
    return (
        <SavedDataContext.Provider value={{ savedData, setSavedData }}>
            {children}
        </SavedDataContext.Provider>
    )
}