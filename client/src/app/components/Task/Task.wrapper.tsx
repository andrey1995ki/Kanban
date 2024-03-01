import {FC} from "react";
import {Task} from "./Task";
import {EmptySvg} from "../../../assets/svg/components/Empty";
import {TaskWrapperProps} from "./Task.model";
// import {useGetTasksQuery} from "../../store/api/api";
import {SkeletonTask} from "../../../assets/common/components/Skeleton";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {TaskSelector} from "../../store/task/task.selector";

export const TaskWrapper: FC<TaskWrapperProps> = ({id, draggable}) => {
    const {boardId} = useParams()
    const {tasks: taskData, loading} = useSelector(TaskSelector)
    const tasks = taskData?.filter(item => item.board == boardId)[0]?.boardTasks?.filter(task => task.board_column_id === id)
    // const {data: tasks, isLoading} = useGetTasksQuery(id)
    if (/*isLoading && !tasks*/ loading) {
        return <SkeletonTask/>
    }
    const countTask = tasks?.length
    return (
        <>
            {
                tasks?.map((task) => {
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
