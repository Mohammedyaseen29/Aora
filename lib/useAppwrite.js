import { useState,useEffect } from "react";
import { Alert } from "react-native";

export const useAppwrite = (fn)=>{
    const [data, setdata] = useState([]);
    const [isLoading,setisLoading] = useState(false);

    const fetchdata = async ()=>{
        try {
            setisLoading(true);
            const data = await fn();
            setdata(data); 
        } catch (error) {
            Alert.alert("Error",error.message)
        }
        finally{
            setisLoading(false);
        }
    }
    useEffect(() => {
        fetchdata();
    }, []);
    
    const refetch = ()=>fetchdata();

    return {data,refetch,isLoading};
}