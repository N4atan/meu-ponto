import { Clock, ClockPlus } from "lucide-react";
import HistItem from "../list_components/hist_item";
import { minutesToHours } from "date-fns";


type Props = {
    saldo: number;
}

export const SaldoTab = ({saldo}: Props) => {

    return (
        <>
            <label className="tab">
                <input type="radio" name="my_tabs_4" />
                <Clock size={16} className="me-2" />
                Horas
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                
                <ul className='flex flex-col gap-3 list-none'>
                    <HistItem 
                        icon={<ClockPlus size={18} />}
                        colorClass="info"
                        title="Banco de Horas"
                        value={saldo ? `${minutesToHours(saldo)}h ${saldo % 60}m` : '0h 0m'}
                    />
                </ul>
            </div>
        </>
    )
}
