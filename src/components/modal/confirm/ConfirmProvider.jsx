import { createContext, useContext, useRef, useState } from "react";

const confirmDialog = createContext()

export const ConfirmDialogProvider = ({children}) =>{
    const [state, setState] = useState({open:false, title:'', });
    const fn = useRef();
    let Component;

    const confirm  = (data)=>{
        console.log(data)
        return new Promise((resolve) => {
            setState({...data, open:true})
            fn.current = (choice) => {
                resolve(choice)
                setState({open:false});
            }
        })
    }
    return <confirmDialog.Provider value={confirm}>
            {children}
             {
                state?.component && (
                     Component = state?.component,
                    <Component open={state.open} setOpen={setState} {...state} onCancel={()=> fn.current(false)} onConfirm={() => fn.current(true) }  />
                ) 
             }
    </confirmDialog.Provider>
}

export default function useConfirm () {
    return useContext(confirmDialog)
}