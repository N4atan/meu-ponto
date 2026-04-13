import axios from "axios";
import toast from "react-hot-toast";

export interface DiaTrabalhado {
    id: number;
    dia: string;
    horaEntrada: string;
    horaSaida: string;
}

export const PontoAPI = {
    buscarPontos: async () => {
        const response = await axios.get("/api/ponto");
        return response.data;
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