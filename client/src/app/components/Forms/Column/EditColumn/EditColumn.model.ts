import {ApiBoardColumnResponse} from "../../../../store/api/api.model";

export interface EditColumnProps extends ApiBoardColumnResponse {
    setError: (error: string | undefined) => void
}

export interface ElementChildren<A> {
    type: 'color' | 'checkbox'
    label: string
    name: keyof A
    initValue: string | boolean
}

export interface EditColumnPayload {
    title: string
    color: string
    final_stage: boolean
}
