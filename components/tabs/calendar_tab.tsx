import { Calendar } from "lucide-react";
import MyCalendar from "../my_calendar/my_calendar";
import { DiaTrabalhado } from "@/lib/prisma";

type Props = {
    ponto: DiaTrabalhado[];
}

export const CalendarTab = ({ ponto }: Props) => {
    return (
        <>
            <label className="tab">
                <input type="radio" name="my_tabs_4" />
                <Calendar size={16} className="me-2" />
                Calendário
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <MyCalendar ponto={ponto}/>
            </div>
        </>
    )
}
