import axios from "axios";

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
    
    baterPonto: async (dia?: string) => {
        const response = await axios.post("/api/ponto", { dia });
        return response.data;
    }
    
}