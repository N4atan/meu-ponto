"use client";

import { LogOut, LogIn } from 'lucide-react';
import { DiaTrabalhado, PontoAPI } from "@/services/ponto";
import { useEffect, useState } from "react";
import { addHours, addMinutes } from 'date-fns';

export default function Home() {
  const [ponto, setPonto] = useState<DiaTrabalhado[]>([]);
  const [dataAtual, setDataAtual] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const [pontoDoDia, setPontoDoDia] = useState<DiaTrabalhado | null>(null);
  const [saidaPrevista, setSaidaPrevista] = useState<Date | null>(null);

  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'];

  useEffect(() => {
    setIsMounted(true);

    PontoAPI.buscarPontos().then((response) => {
      setPonto(response);
      console.table(response);
    });

    // Atualiza a data e hora atual a cada segundo
    const intervalId = setInterval(() => {
      setDataAtual(new Date());
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const pontoDoDia = ponto.find((p) => p.dia === dataAtual.toLocaleDateString('en-CA', {
      timeZone: 'America/Sao_Paulo'
    }));

    if (pontoDoDia) {
      setPontoDoDia(pontoDoDia);
      setSaidaPrevista(addMinutes(addHours(pontoDoDia.horaEntrada, 6), 15));
    }

  }, [ponto]);



  if (!isMounted) {
    return null;
  }

  return (
    <>

      <div className="card card-border bg-base-100 w-96 border-base-300 my-5 mx-auto items-center justify-center">
        <div className="card-body">
          <h2 className="card-title text-center opacity-80">
            {`${diasSemana[dataAtual.getDay()]}, ${dataAtual.getDate()} de ${meses[dataAtual.getMonth()]}`}
          </h2>

          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": dataAtual.getHours() } as React.CSSProperties} aria-live="polite"></span>
              </span>
              horas
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": dataAtual.getMinutes() } as React.CSSProperties} aria-live="polite"></span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": dataAtual.getSeconds() } as React.CSSProperties} aria-live="polite"></span>
              </span>
              seg
            </div>
          </div>

          {!pontoDoDia && (
            <div className="card-actions justify-end">
              <button className="btn btn-outline btn-accent btn-wide mt-5" onClick={() => {
                PontoAPI.baterPonto(dataAtual).then(() => {
                  PontoAPI.buscarPontos().then(setPonto);
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
                  PontoAPI.encerrarJornada(dataAtual).then(() => {
                    PontoAPI.buscarPontos().then(setPonto);
                  });
                }}>
                  Encerrar Jornada
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      <div className="card card-border bg-base-100 w-96 border-base-300 my-5 mx-auto">
        <div className="card-body">
          <h2 className="card-title">Histórico do Dia</h2>

          <div className="flex flex-col gap-4">

            <ul className='flex flex-col gap-3 list-none'>
              {pontoDoDia && (
                <li className='flex items-center gap-3 p-2 px-4 bg-base-100 rounded-md border border-base-300'>
                  <div className='rounded-full p-2 bg-success/10'>
                    <LogIn size={18} className='text-success' />
                  </div>
                  <p className='flex-1 font-medium text-base-content/80'>Entrada</p>
                  <p className='text-sm font-mono font-semibold text-end'>{new Date(pontoDoDia.horaEntrada).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                </li>
              )}

              {pontoDoDia?.horaSaida && (
                <li className='flex items-center gap-3 p-2 px-4 bg-base-100 rounded-md border border-base-300'>
                  <div className='rounded-full p-2 bg-error/10'>
                    <LogOut size={18} className='text-error' />
                  </div>
                  <p className='flex-1 font-medium text-base-content/80'>Saída</p>
                  <p className='text-sm font-mono font-semibold text-end'>{new Date(pontoDoDia.horaSaida).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                </li>
              )}
            </ul>

          </div>
        </div>
      </div>

    </>
  )
}   
