import axios from 'axios';
import toast from "react-hot-toast";

export const SaldoAPI = {
    buscarSaldo: async () => {
        try {
            const response = await axios.get("/api/saldo");
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao buscar saldo");
            throw error;
        }
    }
}