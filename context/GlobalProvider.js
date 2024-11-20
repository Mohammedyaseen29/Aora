import { createContext, useState, useContext, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
    const [loggedIn, setloggedIn] = useState(false);
    const [user, setuser] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        setisLoading(true);
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setloggedIn(true);
                    setuser(res);
                } else {
                    setloggedIn(false);
                    setuser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setisLoading(false); 
            });
    }, []);

    return (
        <GlobalContext.Provider value={{ loggedIn, setloggedIn, user, setuser, isLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};
