import * as XLSX from 'xlsx';
import { PontoAPI } from '@/services/ponto';

export const exportToExcel = async () => {
    try {
        const json = await PontoAPI.buscarPontos();

        const worksheet = XLSX.utils.json_to_sheet(json);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pontos");

        // Gera o arquivo e inicia o download no navegador
        XLSX.writeFile(workbook, `relatório de ponto-${new Date().toISOString()}.xlsx`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};