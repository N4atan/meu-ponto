import axios from "axios";
import toast from "react-hot-toast";

export interface DiaTrabalhado {
    id: number;
    dia: string;
    horaEntrada: Date;
    horaSaida: Date | null;
}

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

    buscarPonto: async (dia: string) => {
        try {
            const response = await axios.get(`/api/ponto/${dia}`);
            return response.data as DiaTrabalhado;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao bater ponto");
            throw error;
        }
    },

    baterPonto: async (date?: Date) => {
        try {
            const response = await axios.post("/api/ponto", { date });
            toast.success(response.data.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao bater ponto");
            throw error;
        }
    },

    encerrarJornada: async (date?: Date) => {
        try {
            const response = await axios.patch("/api/ponto", { date });
            toast.success(response.data.message);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao encerrar jornada");
            throw error;
        }
    }
}