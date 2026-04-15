import { DiaTrabalhado } from "@/lib/prisma";
import { HistTab } from "../tabs/hist_tab";
import { CalendarTab } from "../tabs/calendar_tab";
import { SaldoTab } from "../tabs/saldo_tab";

type Props = {
    pontoDoDia: DiaTrabalhado | null;
    ponto: DiaTrabalhado[];
    saldo: string;
}

const TabContent = ({ pontoDoDia, ponto, saldo }: Props) => {
    return (
        <div className="tabs tabs-lift w-96 border-base-300 my-5 mx-auto">
            <HistTab pontoDoDia={pontoDoDia} />
            <CalendarTab ponto={ponto} />
            <SaldoTab saldo={saldo} />
        </div>
    )   
}

export default TabContent;