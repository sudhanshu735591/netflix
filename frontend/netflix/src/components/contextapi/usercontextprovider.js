import { useState } from "react";
import UserContext from "./usercontext";

const UserContextProvider = ({children})=>{
    const [flag, setFlag] = useState(null);
    const [loginId, setLoginId] = useState(null);

    return(
        <UserContext.Provider value={ {
            flag, setFlag ,
            loginId, setLoginId
        } }>
        {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;