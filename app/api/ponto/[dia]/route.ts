import { prisma } from "@/lib/prisma";
import { addHours, addMinutes, differenceInHours, differenceInMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest, 
    { params }: { params: Promise<{ dia: string }> }
) {
    try {
        const { dia } = await params;

        const ponto = await prisma.diaTrabalhado.findFirst({
            where: {
                dia: dia,
            }
        });

        return NextResponse.json(ponto);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erro ao buscar ponto" }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ dia: string }> }
) {
    try {
        const { dia } = await params;
        

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

        const diffMin = differenceInMinutes(agora, saidaPrevista);
        

        const pontoAtualizado = await prisma.diaTrabalhado.update({
            where: {
                dia: dia
            },
            data: {
                horaSaida: agora,
                minutosExtras: diffMin
            }
        });

        return NextResponse.json({ status: 200, message: "Ponto encerrado com sucesso" });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Erro ao atualizar ponto" }, { status: 500 });
    }
}