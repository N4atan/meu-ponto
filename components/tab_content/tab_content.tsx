import HistLogin from "../list_components/hist_login"
import { DiaTrabalhado } from "@/lib/prisma";
import { ChartBar, Calendar } from "lucide-react"
import MyCalendar from "../my_calendar/my_calendar"


type Props = {
    pontoDoDia: DiaTrabalhado | null;
    ponto: DiaTrabalhado[];
}

const tabContent = ({ pontoDoDia, ponto }: Props) => {

    return (
        <div className="tabs tabs-lift w-96 border-base-300 my-5 mx-auto">
            <label className="tab">
                <input type="radio" name="my_tabs_4" defaultChecked />
                <ChartBar size={16} className="me-2" />
                Histórico
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <h2 className="card-title mb-2">Histórico do Dia</h2>

                <div className="flex flex-col gap-4">
                    <ul className='flex flex-col gap-3 list-none'>
                        {pontoDoDia && (
                            <HistLogin hour={pontoDoDia.horaEntrada} type='logIn' />
                        )}

                        {pontoDoDia?.horaSaida && (
                            <HistLogin hour={pontoDoDia.horaSaida} type='logOut' />
                        )}
                    </ul>
                </div>
            </div>

            <label className="tab">
                <input type="radio" name="my_tabs_4" />
                <Calendar size={16} className="me-2" />
                Calendário
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <MyCalendar ponto={ponto}/>
            </div>


        </div>
    )   
}

export default tabContent;