"use client";

import { DiaTrabalhado, PontoAPI } from "@/services/ponto";
import { useEffect, useState } from "react";

export default function Home() {
    const [ponto, setPonto] = useState<DiaTrabalhado[]>([]);

    useEffect(() => {
        PontoAPI.buscarPontos().then((response) => {
            setPonto(response);
            console.table(response);
        });
    }, []);

  return (
    <>
    <button className="btn btn-primary" onClick={() => PontoAPI.baterPonto('2026-04-11')}>
      Bater Ponto
    </button>

    <ul>
        {ponto.map((diaTrabalhado) => (
            <li key={diaTrabalhado.id}>
                {diaTrabalhado.dia} - {diaTrabalhado.horaEntrada.split('T')[1]}
            </li>
        ))}
    </ul></>
  )
}   
