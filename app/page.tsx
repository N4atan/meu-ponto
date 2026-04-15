"use client";

import { PontoAPI } from "@/services/ponto";
import { DiaTrabalhado } from "@/lib/prisma";
import { useEffect, useState } from "react";
import { addHours, addMinutes } from 'date-fns';
import TabContent from '@/components/tab_content/tab_content';
import { FullDateLabel } from "@/components/date_display/full_date_label";
import { Countdown } from "@/components/date_display/countdown";
import { DateDisplay } from "@/components/date_display/date_display";

export default function Home() {
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const [ponto, setPonto] = useState<DiaTrabalhado[]>([]);
  const [pontoDoDia, setPontoDoDia] = useState<DiaTrabalhado | null>(null);

  const reloadPonto = () => {
    PontoAPI.buscarPontos().then((response) => {
      setPonto(response);
    });
  }

  useEffect(() => {
     setIsMounted(true);
     reloadPonto();
  }, []);

  useEffect(() => {
    const hoje = new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/Sao_Paulo'
    });
    const pDoDia = ponto.find((p) => p.dia === hoje);

    if (pDoDia) {
      setPontoDoDia(pDoDia);
    } else {
      setPontoDoDia(null);
    }

  }, [ponto]);



  if (!isMounted) {
    return null;
  }

  return (
    <>

      <DateDisplay pontoDoDia={pontoDoDia} onReload={reloadPonto} />

      <TabContent pontoDoDia={pontoDoDia} ponto={ponto} />

    </>
  )
}   
