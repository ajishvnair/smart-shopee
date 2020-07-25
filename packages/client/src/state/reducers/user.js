export default user = (state = {}, action) => {
    switch (action.type) {
        case "SETLOCATIONS":
            return { ...action.user };
        default:
            return state;
    }
};
