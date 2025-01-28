const AddCarinho = document.getElementById('add-carrinho')
const Quantidade = document.getElementById('quantitade')
const numeroQuantidade = document.getElementById('quantidade')
const buttonMais = document.getElementById('mais-button')
const buttonMenos = document.getElementById('menos-button')

buttonMais.addEventListener('click', () => {
    let quantidadeAtual = parseInt(numeroQuantidade.textContent)
    numeroQuantidade.textContent = quantidadeAtual + 1
})

buttonMenos.addEventListener('click', () => {
    if (numeroQuantidade.textContent == 1) {
        numeroQuantidade.textContent = 0
        MudarQuantidade()
    } else {
        let quantidadeAtual = parseInt(numeroQuantidade.textContent)
        numeroQuantidade.textContent = quantidadeAtual - 1
    }

})


function MudarQuantidade() {
    if (numeroQuantidade.textContent == 0) {
        AddCarinho.style.opacity = '1.0'
        Quantidade.style.opacity = '0.0'
        AddCarinho.style.zIndex = '99';
        Quantidade.style.zIndex = '0';
        numeroQuantidade.textContent = 1
    } else {
        AddCarinho.style.opacity = '0.0'
        Quantidade.style.opacity = '1.0'
        Quantidade.style.zIndex = '99';
        AddCarinho.style.zIndex = '0';
    }

}