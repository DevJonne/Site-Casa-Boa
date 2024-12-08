function formatarPreco(campo) {
    // Remove todos os caracteres que não sejam números ou vírgulas
    let valor = campo.value.replace(/[^\d,]/g, '');
    
    // Substitui vírgulas extras por um único separador decimal
    let partes = valor.split(',');
    if (partes.length > 2) {
        valor = partes[0] + ',' + partes.slice(1).join('');
    }

    // Adiciona separadores de milhar
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    campo.value = valor;
}

document.querySelector('form').addEventListener('submit', function(event) {
    const campoPreco = document.getElementById('preco');
    const valor = campoPreco.value.replace(/\./g, '').replace(',', '.');
    campoPreco.value = valor; // Substitui o valor formatado pelo numérico
});