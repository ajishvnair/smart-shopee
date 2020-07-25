export default locations = (state = [], action) => {
    switch (action.type) {
        case "SETLOCATIONS":
            return [...action.locations];
        default:
            return state;
    }
};
