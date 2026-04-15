import { ChartBar, LogIn, LogOut } from "lucide-react";
import HistItem from "../list_components/hist_item";
import { DiaTrabalhado } from "@/lib/prisma";

type Props = {
    pontoDoDia: DiaTrabalhado | null;
}

export const HistTab = ({ pontoDoDia }: Props) => {
    return (
        <>
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
                            <HistItem 
                                icon={<LogIn size={18} />}
                                colorClass="success"
                                title="Entrada"
                                value={new Date(pontoDoDia.horaEntrada).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            />
                        )}

                        {pontoDoDia?.horaSaida && (
                            <HistItem 
                                icon={<LogOut size={18} />}
                                colorClass="error"
                                title="Saída"
                                value={new Date(pontoDoDia.horaSaida).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            />
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}
