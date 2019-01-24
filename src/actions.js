export const updateFiltering = (filter, activeOptions) => (
    {
        type: 'FILTER_UPDATE',
        payload: {[filter] : activeOptions}
    }
)

export const loginSuccess = (user) => (
    {
        type: 'LOGIN_SUCCESS',
        payload: user
    }
)

export const logOut = () => (
    {
        type: 'LOGOUT_SUCCESS',
    }
)

export const toggleItemTracking = (itemId, action) => {
    if(action === "add") {
        console.log("firing off add action");
        return {
            type: 'ITEM_TRACKING_ADD',
            payload: itemId
        }
    } else if (action === "remove") {

        return({
            type: 'ITEM_TRACKING_REMOVE',
            payload: itemId
        })
    } else {
        return undefined;
    }
}

