'use client'

import React, { useState } from 'react';
import { DayPicker, DayButtonProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';
import { DiaTrabalhado } from '@/services/ponto';

type MyCalendarProps = {
    ponto: DiaTrabalhado[];
}

const MyCalendar = ({ ponto }: MyCalendarProps) => {
    
    const workedDays = ponto.filter((p) => p.horaSaida !== null).map((p) => new Date(p.dia.split('T')[0] + 'T12:00:00'));
    const onlyEntry  = ponto.filter((p) => p.horaSaida === null).map((p) => new Date(p.dia.split('T')[0] + 'T12:00:00'));

    const CustomDayButton = (props: DayButtonProps) => {
        const { day, modifiers, ...buttonProps } = props;
        
        let tooltipText = "";
        
        if (modifiers.worked || modifiers.onlyEntry) {
            const dateStr = day.date.toLocaleDateString('en-CA');
            const p = ponto.find(p => p.dia.startsWith(dateStr));
            
            if (p) {
                const entrada = new Date(p.horaEntrada).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const saida = p.horaSaida ? new Date(p.horaSaida).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--';
                tooltipText = `Entrada: ${entrada} | Saída: ${saida}`;
            }
        }

        if (tooltipText) {
            return (
                <div className="tooltip z-50 tooltip-secondary" data-tip={tooltipText}>
                    <button {...buttonProps} />
                </div>
            );
        }

        return <button {...buttonProps} />;
    };

    return (
        <div className="flex justify-center text-base-content items-center">
            <DayPicker 
                mode="single"
                locale={ptBR}
                className="bg-base-100 rounded-lg p-2"
                modifiers={{
                    worked: workedDays,
                    onlyEntry: onlyEntry
                }}
                modifiersClassNames={{
                    today: 'bg-base-300 rounded-lg',
                    selected: 'bg-base-200',
                    worked: 'font-bold text-secondary rounded',
                    onlyEntry: 'font-bold text-secondary rounded'
                }}
                components={{
                    DayButton: CustomDayButton
                }}
            />
        </div>
    );
};

export default MyCalendar;
