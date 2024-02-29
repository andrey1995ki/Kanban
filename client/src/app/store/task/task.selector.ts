import {RootState} from "../store";

export const TaskSelector = (store: RootState) => {
    return store.task
}
