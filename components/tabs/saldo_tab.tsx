import { Clock } from "lucide-react";
import HistItem from "../list_components/hist_item";
import { useEffect, useState } from "react";

type Props = {
    saldo: string;
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
                        icon={<Clock size={18} />}
                        colorClass="primary"
                        title="Banco de Horas"
                        value={saldo ? `${saldo} min` : "0 min"}
                    />
                </ul>
            </div>
        </>
    )
}
