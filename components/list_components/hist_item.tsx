import { ReactNode } from "react"

export type HistItemProps = {
    icon: ReactNode;
    title: string;
    value: string | ReactNode;
    colorClass?: "success" | "error" | "warning" | "info" | "primary" | "secondary" | "accent" | "neutral";
}

const colorMaps = {
    success: "bg-success/10 text-success",
    error: "bg-error/10 text-error",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    neutral: "bg-neutral/10 text-neutral",
}

const HistItem = ({ icon, title, value, colorClass = "primary" }: HistItemProps) => {
    return (
        <li className='flex items-center gap-3 p-2 px-4 bg-base-100 rounded-md border border-base-300'>
            <div className={`rounded-full p-2 flex items-center justify-center ${colorMaps[colorClass]}`}>
                {icon}
            </div>
            <p className='flex-1 font-medium text-base-content/80'>{title}</p>
            <div className='text-sm font-mono font-semibold text-end'>{value}</div>
        </li>
    )
}

export default HistItem;