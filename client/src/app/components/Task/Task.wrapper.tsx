import {useGetTasksQuery} from "../../store/api/api";
import {SkeletonTask} from "../../../assets/common/components/Skeleton";
import {FC} from "react";
import {Task} from "./Task";
import {EmptySvg} from "../../../assets/svg/components/Empty";
import {TaskWrapperProps} from "./Task.model";

export const TaskWrapper:FC<TaskWrapperProps> = ({id,draggable}) => {
    const {data: tasks, isLoading} = useGetTasksQuery(id)
    if (isLoading && !tasks) {
        return <SkeletonTask/>
    }
    const countTask = tasks!.length
    return (
        <>
            {
                tasks!.map((task) => {
                    return <Task {...task} key={task.id} draggable={draggable}/>
                })
            }
            {
                countTask === 0 &&
                <EmptySvg title={'Задачи отсутствуют'}/>
            }
        </>
    );
};
