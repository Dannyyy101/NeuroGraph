import clsx from 'clsx'

interface LabelProps {
    className: string
    children: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({ className, children }) => {
    const defaultStyle = 'rounded-xl px-2 m-1 text-sm flex justify-center items-center'
    const style = clsx(className, defaultStyle)

    return <p className={style}>{children}</p>
}
