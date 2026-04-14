'use client'

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';

type MyCalendarProps = {
    // Array de datas para marcar no calendário (ex: dias que teve registro de ponto)
    workedDays?: Date[];
}

const MyCalendar = ({ workedDays = [] }: MyCalendarProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex justify-center text-base-content items-center">
            <DayPicker 
                mode="single"
                selected={selectedDate}
                locale={ptBR}
                className="bg-base-100 rounded-lg p-2"
                modifiers={{
                    worked: workedDays
                }}
                modifiersClassNames={{
                    today: 'bg-base-200 rounded-lg',
                    selected: 'bg-base-200 rounded-lg',
                    worked: 'font-bold text-secondary rounded line-through'
                }}
            />
        </div>
    );
};

export default MyCalendar;
