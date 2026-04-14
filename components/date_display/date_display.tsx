import { FullDateLabel } from "./full_date_label";
import { Countdown } from "./countdown";
import { DiaTrabalhado } from "@/services/ponto";
import { useState, useEffect } from "react";
import { PontoAPI } from "@/services/ponto";
import { addHours, addMinutes } from "date-fns";

type Props = {
    pontoDoDia: DiaTrabalhado | null;
    onReload: () => void;
}


export const DateDisplay = ({ pontoDoDia, onReload }: Props) => {
    const [saidaPrevista, setSaidaPrevista] = useState<Date | null>(null);

    useEffect(() => {
        if (pontoDoDia) {
            setSaidaPrevista(addMinutes(addHours(pontoDoDia.horaEntrada, 6), 15));
        }
    }, [pontoDoDia]);


    return (
        <div className="card card-border bg-base-100 w-96 border-base-300 my-5 mx-auto items-center justify-center">
            <div className="card-body">
                <FullDateLabel dataAtual={new Date()} />
                <Countdown />

                {!pontoDoDia && (
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-accent btn-wide mt-5" onClick={() => {
                            PontoAPI.baterPonto(new Date()).then(() => {
                                onReload();
                            });
                        }}>
                            Iniciar Jornada
                        </button>
                    </div>
                )}

                {pontoDoDia && !pontoDoDia.horaSaida && (
                    <>
                        <p>Saída Prevista: {saidaPrevista?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>

                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-secondary btn-wide mt-5" onClick={() => {
                                PontoAPI.encerrarJornada(new Date()).then(() => {
                                    onReload();
                                });
                            }}>
                                Encerrar Jornada
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}