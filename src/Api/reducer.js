
export const reducer = (state, {type, payload})=>{
    switch(type){
        case "LOADING":
            return{
                ...state,
                loading: true
            }
        case "ERROR":
            return{
                ...state,
                error: payload,
                loading: false

            }
        case "OUTPUT":
            return{
                ...state,
                error: "",
                loading: false,
                output: payload
            }
        default:
            return state;
    }
}