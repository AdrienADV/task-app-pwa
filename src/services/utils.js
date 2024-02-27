export const areArgumentsValid = (...args) => {
    for (const arg of args) {
        if (arg === "" || arg === undefined) {
            return false;
        }
    }
    return true;
};
