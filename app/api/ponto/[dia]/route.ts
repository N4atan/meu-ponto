import { prisma } from "@/lib/prisma";
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