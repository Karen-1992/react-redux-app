export function logger(state) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // console.log(store);
            return next(action);
        }
    }
}