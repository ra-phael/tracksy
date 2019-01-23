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