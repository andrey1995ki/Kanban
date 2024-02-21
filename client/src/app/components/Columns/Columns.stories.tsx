/* eslint-disable */
import type {Meta, StoryObj} from '@storybook/react';
import '../../../index.scss'
import {ColumnComponent} from "./components/Column.component";
import {useEffect, useRef} from "react";
import {EmptySvg} from "../../../assets/svg/components/Empty";
import {Skeleton, SkeletonTask} from "../../../assets/common/components/Skeleton";
import {randomColor} from "../Forms/Column/CreateColumn/CreateColumn.utils";
import style from "./Columns.module.scss";
import styleTask from "../Task/Task.module.scss";

const column: Meta<typeof ColumnComponent> = {
    title: "Components/Column",
    component: ColumnComponent,
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'Дочерний элемент отвечающий за задачи',
            control: false,
            table: {
                type: {summary: 'ReactElement'}
            }
        },
        dragOver: {
            description: 'Функция отвечающая за отслеживание перемещаемого элемента над колонкой',
            control: false,
            table: {
                type: {summary: 'function(event: DragEvent<HTMLDivElement>)'}
            }
        },
        dragEnd: {
            description: 'Функция отвечающая за отслеживание покидание перемещаемого элемента',
            control: false,
            table: {
                type: {summary: 'function(event: DragEvent<HTMLDivElement>)'}
            }
        },
        dropEvent: {
            description: 'Функция отвечающая за помещение перемещаемого элемента в колонку',
            control: false,
            table: {
                type: {summary: 'function(event: DragEvent<HTMLDivElement>)'}
            }
        },
        title: {
            description: 'Название колонки',
        },
        final_stage: {
            description: 'Признак обозначающий что колонка это финальная стадия (запрет перемещаемости элементов отсюда)',
        },
        columnRef: {
            description: 'Ссылка на колонку',
            control: false,
        },
        color: {
            description: 'Цвет значка у колонки',
        }
    }
}

export default column;
type Story = StoryObj<typeof ColumnComponent>

const ColumnPattern: Story = {
    render: function Render(args) {
        const {color, final_stage, title, children} = args
        const ref = useRef<HTMLElement>(null)
        const dragOver = () => {
        }
        const dragEnd = () => {
        }
        const dropEvent = () => {
        }
        return <ColumnComponent columnRef={ref} dragOver={dragOver} dragEnd={dragEnd} dropEvent={dropEvent}
                                color={color}
                                final_stage={final_stage}
                                title={title}
                                children={children}/>
    }
}
const TaskPattern = () => {
    const Task = (props: { title: string, countSubTask: number, countDoneSubTask: number }) => {
        const {title, countSubTask, countDoneSubTask} = props
        return (
            <div className={styleTask.task}>
                <div><h3>{title}</h3></div>
                {
                    countSubTask > 0 &&
                    <span className={styleTask.subTaskTitle}>{countDoneSubTask} из {countSubTask} подзадач</span>
                }
            </div>
        )

    }
    return (<>
        <Task title={'Задача 1'} countSubTask={4} countDoneSubTask={3}/>
        <Task title={'Задача 2'} countSubTask={4} countDoneSubTask={0}/>
        <Task title={'Задача 3'} countSubTask={0} countDoneSubTask={0}/>
    </>)
}

export const ColumnDefault: Story = {
    ...ColumnPattern,
    args: {
        color: randomColor(),
        final_stage: false,
        title: 'Название колонки',
        children: <EmptySvg title={'Задачи отсутствуют'}/>
    }
}
export const ColumnDefaultFinalStage: Story = {
    ...ColumnPattern,
    args: {
        color: randomColor(),
        final_stage: true,
        title: 'Название финальной колонки',
        children: <EmptySvg title={'Задачи отсутствуют'}/>
    }
}
export const ColumnWithLoading: Story = {
    render: function Render() {
        return <Skeleton countColumn={1}/>
    },
    args: {
        color: randomColor(),
        final_stage: false,
        title: 'Название колонки',
        children: <SkeletonTask/>
    }
}
export const ColumnWithLoadingTask: Story = {
    ...ColumnPattern,
    args: {
        color: randomColor(),
        final_stage: false,
        title: 'Название колонки',
        children: <SkeletonTask/>
    }
}
export const ColumnWithTask: Story = {
    ...ColumnPattern,
    args: {
        color: randomColor(),
        final_stage: false,
        title: 'Название колонки',
        children: <TaskPattern/>
    }
}

export const ColumnDraggingEffect: Story = {
    render: function Render(args) {
        const {columnRef, ...props} = args
        const ref = useRef<HTMLElement>(null)
        useEffect(() => {
            ref.current && ref.current?.classList.add(style.dragging)
        }, [ref])
        return <ColumnComponent columnRef={ref} {...props}/>
    },
    args: {
        color: randomColor(),
        final_stage: false,
        title: 'Название колонки',
        children: <EmptySvg title={'Задачи отсутствуют'}/>,
        dragOver: () => {
        },
        dragEnd: () => {
        },
        dropEvent: () => {
        },
    }
}
