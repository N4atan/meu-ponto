import { useState, useEffect } from "react";

export const Countdown = () => {
    const [dataAtual, setDataAtual] = useState<Date>(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDataAtual(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
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
    )
}