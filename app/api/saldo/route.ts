import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
    // O Prisma pede à base de dados para somar toda a coluna "saldoMinutos"
    const resultado = await prisma.diaTrabalhado.aggregate({
      _sum: {
        minutosExtras: true
      }
    });

    // Se não houver registos, o valor é 0
    const saldoTotal = resultado._sum.minutosExtras || 0;

    return NextResponse.json({ saldoTotal });

  } catch (error) {
    return NextResponse.json({ erro: "Erro ao calcular saldo" }, { status: 500 });
  }
}