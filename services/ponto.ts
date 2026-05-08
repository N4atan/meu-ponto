import axios from "axios";
import toast from "react-hot-toast";
import { DiaTrabalhado } from "@/lib/prisma";



export const PontoAPI = {
    buscarPontos: async () => {
        try {
            const response = await axios.get("/api/ponto");

            const ponto = response.data.map((p: DiaTrabalhado) => {
                return {
                    ...p,
                    horaEntrada: new Date(p.horaEntrada),
                    horaSaida: p.horaSaida ? new Date(p.horaSaida) : null
                }
            });

            return ponto;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao buscar ponto");
            throw error;
        }
    },

    buscarPonto: async (date: Date) => {
        try {
            const dia = date.toISOString().split("T")[0];
            const response = await axios.get(`/api/ponto/${dia}`);
            return response.data as DiaTrabalhado;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao bater ponto");
            throw error;
        }
    },

    baterPonto: async (date: Date) => {
        try {
            const dia = date.toISOString().split("T")[0];

            const response = await axios.post(`/api/ponto`, { dia });
            toast.success("Ponto registrado com sucesso!");
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao bater ponto");
            throw error;
        }
    },

    encerrarJornada: async (date: Date) => {
        try {
            const dia = date.toISOString().split("T")[0];
            const response = await axios.patch(`/api/ponto/${dia}`);
            toast.success("Jornada encerrada com sucesso!");
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao encerrar jornada");
            throw error;
        }
    },

    inserirAusencia: async (date: Date) => {
        try {
            const dia = date.toISOString().split("T")[0];
            const response = await axios.post(`/api/ponto`, { dia, ausencia: true });
            toast.success("Ausência inserida com sucesso!");
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao inserir ausência");
            throw error;
        }
    }
}