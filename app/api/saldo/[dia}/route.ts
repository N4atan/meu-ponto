import { prisma } from "@/lib/prisma";
import { addHours, addMinutes, differenceInHours, differenceInMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ dia: string }> }
) {
    try {
        const { dia } = await params;
        const body = await request.json();
        const { tempoExtra } = body;

        const ponto = await prisma.diaTrabalhado.findUnique({
            where: {
                dia: dia
            }
        });

        if (!ponto) {
            return NextResponse.json({ message: "Ponto não encontrado" }, { status: 404 });
        }

        const agora = new Date();
        const saidaPrevista = addMinutes(addHours(ponto.horaEntrada, 6), 15);

        const diffMin = tempoExtra ? tempoExtra : differenceInMinutes(agora, saidaPrevista)
        

        const pontoAtualizado = await prisma.diaTrabalhado.update({
            where: {
                dia: dia
            },
            data: {
                horaSaida: agora,
                minutosExtras: diffMin
            }
        });

        return NextResponse.json({ status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Erro ao atualizar ponto" }, { status: 500 });
    }
}