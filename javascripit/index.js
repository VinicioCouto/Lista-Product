const addCarrinhos = document.querySelectorAll('.add-carrinho');
const quantidades = document.querySelectorAll('.quantitade'); 

addCarrinhos.forEach((addCarinho, index) => {
    const quantidade = quantidades[index];
    const numeroQuantidade = quantidade.querySelector('.numero-quantidade');
    const buttonMais = quantidade.querySelector('.mais-button');
    const buttonMenos = quantidade.querySelector('.menos-button');
    const carrinhoCheio = document.querySelector('.carrinho-cheio')
    const carrinhoVazio = document.querySelector('.carrinho-vazio')

    
    buttonMais.addEventListener('click', () => {
        let quantidadeAtual = parseInt(numeroQuantidade.textContent);
        numeroQuantidade.textContent = quantidadeAtual + 1;
    });


    buttonMenos.addEventListener('click', () => {
        let quantidadeAtual = parseInt(numeroQuantidade.textContent);

        if (quantidadeAtual > 1) {
            numeroQuantidade.textContent = quantidadeAtual - 1;
        } else {
            numeroQuantidade.textContent = 0;
            mudarQuantidade(addCarinho, quantidade, numeroQuantidade);
            MudarDiv(numeroQuantidade, carrinhoCheio, carrinhoVazio)
            numeroQuantidade.textContent = 1;
            
        }
    });

    
    addCarinho.addEventListener('click', () => {
        mudarQuantidade(addCarinho, quantidade, numeroQuantidade);
        MudarDiv(numeroQuantidade, carrinhoCheio, carrinhoVazio)
    });
});

function mudarQuantidade(addCarinho, quantidade, numeroQuantidade) {
    if (parseInt(numeroQuantidade.textContent) === 0) {
        addCarinho.style.opacity = '1.0';
        quantidade.style.opacity = '0.0';
        addCarinho.style.zIndex = '99';
        quantidade.style.zIndex = '0';
    } else {
        addCarinho.style.opacity = '0.0';
        quantidade.style.opacity = '1.0';
        quantidade.style.zIndex = '99';
        addCarinho.style.zIndex = '0';
    }
}

function MudarDiv(numeroQuantidade, carrinhoCheio, carrinhoVazio) {
    if (parseInt(numeroQuantidade.textContent) === 0) {
        carrinhoCheio.style.display = 'none';
        carrinhoVazio.style.display = 'flex';
    } else {
        carrinhoCheio.style.display = 'block';
        carrinhoVazio.style.display = 'none';
    }
    
}
