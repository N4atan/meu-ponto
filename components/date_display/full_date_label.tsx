

export const FullDateLabel = ({ dataAtual }: { dataAtual: Date }) => {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'];

    return (
        <h2 className="card-title text-center opacity-80">
            {`${diasSemana[dataAtual.getDay()]}, ${dataAtual.getDate()} de ${meses[dataAtual.getMonth()]}`}
        </h2>
    )
}