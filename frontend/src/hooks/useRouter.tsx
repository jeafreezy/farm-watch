//coming from Next JS, I really need my useRouter() :)
// import { useHistory } from "react-router-dom";
import {useMemo} from 'react'
const useRouter=() =>{

    // const history = useHistory();

    return useMemo(() =>{
        	return{
                // push:history.push
            }
    },[])
    
}