export interface OptionsProps {
    optionsArray: Array<OptionsArray>
}

export interface OptionsArray {
    callback: () => void
    title: string
}

export interface OptionsBlockProps extends OptionsProps {
    setShowOptions: (showOptions: boolean) => void
}

