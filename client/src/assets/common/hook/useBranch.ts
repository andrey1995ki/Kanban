import {useState} from "react";

export const useBranch = () => {
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded(!expanded)
    return {
        expanded, toggleExpanded
    }
}
