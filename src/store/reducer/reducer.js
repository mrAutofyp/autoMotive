const initaiState = {
    Allusers: [],
    currentuser: {},
    allProducts: [],
    sucessMsg: true
}

const store = (state = initaiState, action) => {

    switch (action.type) {
        case "currentUser":
            return ({
                ...state,
                currentuser: action.payload
            })
        case "getAllUsers":

            return ({
                ...state,
                Allusers: action.payload
            })
        case "getOldchats":

            return ({
                ...state,
                oldChats: action.payload
            })
        case "logOut":
            return ({
                ...state,
                currentuser: ''
            })
        case "get_All_Products":
            return ({
                    ...state,
                    allProducts: action.payload
                })
                // case "closeSuccessMsg":
                //     return ({
                //         ...state,
                //         sucessMsg: action.payload
                //     })
        default:
            return (state)
    }
}

export default store;