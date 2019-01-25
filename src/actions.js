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

export const updateWatchedItems = (watchedItems) => (
    {
        type: 'ITEM_TRACKING_CHANGE',
        payload: watchedItems
    }
)

