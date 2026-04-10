// NextResponse é o substituto do "res.send()"
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET () {
    try {
        const ponto = await prisma.diaTrabalhado.findMany();
        return NextResponse.json(ponto);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Erro ao buscar ponto" }, { status: 500 });
    }
}

export async function POST (request: Request) {
    try {
        const agora = new Date();

        const { dia } = await request.json();
        
        const novoPonto = await prisma.diaTrabalhado.create({
            data: {
                dia: dia ?? agora.toISOString().split('T')[0],
                horaEntrada: agora,
            }
        });

        return NextResponse.json(novoPonto, { status: 201 });
    } catch (error: any) {
        if (error.code === "P2002") {
            console.log("Ponto ja batido");
            return NextResponse.json({ message: "Ponto ja batido" }, { status: 400 });
        }

        console.log(error);
        return NextResponse.json({ message: "Erro ao bater ponto" }, { status: 500 });
    }
}