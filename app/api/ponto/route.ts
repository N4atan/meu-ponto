// NextResponse é o substituto do "res.send()"
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const ponto = await prisma.diaTrabalhado.findMany();
        return NextResponse.json(ponto);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Erro ao buscar ponto" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const agora = new Date();

        const diaLocal = agora.toLocaleDateString('en-CA', {
            timeZone: 'America/Sao_Paulo'
        });;

        const { dia } = await request.json();

        const novoPonto = await prisma.diaTrabalhado.create({
            data: {
                dia: dia ?? diaLocal,
                horaEntrada: agora,
            }
        });

        return NextResponse.json({ status: 201, message: "Ponto batido com sucesso" });
    } catch (error: any) {
        if (error.code === "P2002") {
            console.log("Ponto ja batido");
            return NextResponse.json({ message: "Ponto ja batido" }, { status: 400 });
        }

        console.log(error);
        return NextResponse.json({ message: "Erro ao bater ponto" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const agora = new Date();

        const diaLocal = agora.toLocaleDateString('en-CA', {
            timeZone: 'America/Sao_Paulo'
        });;

        const { dia } = await request.json();

        const ponto = await prisma.diaTrabalhado.findUnique({
            where: {
                dia: dia ?? diaLocal,
            }
        });

        if (!ponto) {
            return NextResponse.json({ message: "Ponto não encontrado" }, { status: 404 });
        }

        const pontoAtualizado = await prisma.diaTrabalhado.update({
            where: {
                dia: dia ?? diaLocal,
            },
            data: {
                horaSaida: agora,
            }
        });

        return NextResponse.json({ status: 200, message: "Ponto encerrado com sucesso" });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: "Erro ao atualizar ponto" }, { status: 500 });
    }
}