import { LogIn, LogOut } from "lucide-react"

type Props = {
    hour: Date;
    type: 'logIn' | 'logOut';
}

const cardLogin = ({ hour }: Omit<Props, 'type'>) => (
    <li className='flex items-center gap-3 p-2 px-4 bg-base-100 rounded-md border border-base-300'>
        <div className='rounded-full p-2 bg-success/10'>
            <LogIn size={18} className='text-success' />
        </div>
        <p className='flex-1 font-medium text-base-content/80'>Entrada</p>
        <p className='text-sm font-mono font-semibold text-end'>{hour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
    </li>
)

const cardLogOut = ({ hour }: Omit<Props, 'type'>) => (
    <li className='flex items-center gap-3 p-2 px-4 bg-base-100 rounded-md border border-base-300'>
        <div className='rounded-full p-2 bg-error/10'>
            <LogOut size={18} className='text-error' />
        </div>
        <p className='flex-1 font-medium text-base-content/80'>Saída</p>
        <p className='text-sm font-mono font-semibold text-end'>{hour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
    </li>
)

const HistLogin = ({ hour, type }: Props) => {

    if (type == 'logIn') {
        return cardLogin({ hour })
    }

    return cardLogOut({ hour })
}

export default HistLogin