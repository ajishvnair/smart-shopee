export default locations = (state = [], action) => {
    switch (action.type) {
        case "SET":
            return [...action.locations];
        default:
            return state;
    }
};
