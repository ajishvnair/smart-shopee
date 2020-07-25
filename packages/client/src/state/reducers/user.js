export default user = (state = {}, action) => {
    switch (action.type) {
        case "SETUSER":
            return { ...action.user };
        default:
            return state;
    }
};
