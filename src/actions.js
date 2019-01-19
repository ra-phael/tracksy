export const updateFiltering = (filter, activeOptions) => (
    {
        type: 'FILTER_UPDATE',
        payload: {[filter] : activeOptions}
    }
)