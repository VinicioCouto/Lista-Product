const addCarrinhos = document.querySelectorAll('.add-carrinho');
const quantidades = document.querySelectorAll('.quantitade');
const carrinhoCheio = document.querySelector('.carrinho-cheio');
const carrinhoVazio = document.querySelector('.carrinho-vazio');
const carrinhoProdutos = carrinhoCheio.querySelector('.produto-add');
const tituloCarrinho = document.querySelector('.titulo-carrinho');
const totalValor = document.querySelector('.total-valor');

let totalCarrinho = 0;
let itensCarrinho = [];
let contcarrinho = 250 - 65

addCarrinhos.forEach((addCarinho, index) => {
    const quantidade = quantidades[index];
    const numeroQuantidade = quantidade.querySelector('.numero-quantidade');
    const buttonMais = quantidade.querySelector('.mais-button');
    const buttonMenos = quantidade.querySelector('.menos-button');
    const produtoNome = addCarinho.closest('.box-produto').querySelector('.Nome-protudo').textContent;
    const produtoValor = parseFloat(addCarinho.closest('.box-produto').querySelector('.valor').textContent.replace('$', ''));

    buttonMais.addEventListener('click', () => {
        let quantidadeAtual = parseInt(numeroQuantidade.textContent);
        numeroQuantidade.textContent = quantidadeAtual + 1;

        const item = itensCarrinho.find(item => item.nome === produtoNome)

        const itemExistente = itensCarrinho.find(item => item.nome === produtoNome);

        if (item) {
            totalCarrinho += produtoValor
            itemExistente.quantidade = quantidadeAtual + 1
            atualizarCarrinho()
        }
    });

    buttonMenos.addEventListener('click', () => {
        let quantidadeAtual = parseInt(numeroQuantidade.textContent);

        if (quantidadeAtual > 1) {
            numeroQuantidade.textContent = quantidadeAtual - 1;
            const item = itensCarrinho.find(item => item.nome === produtoNome)

            const itemExistente = itensCarrinho.find(item => item.nome === produtoNome);

            if (item) {
                totalCarrinho -= produtoValor
                itemExistente.quantidade = quantidadeAtual - 1
                atualizarCarrinho()
            }
        } else {
            numeroQuantidade.textContent = 1;
        }
    });

    addCarinho.addEventListener('click', () => {
        const quantidadeAtual = parseInt(numeroQuantidade.textContent);

        mudarQuantidade(addCarinho, quantidade, numeroQuantidade);

        adicionarAoCarrinho(produtoNome, produtoValor, quantidadeAtual);

        atualizarCarrinho();
    });
});

function mudarQuantidade(addCarinho, quantidade, numeroQuantidade) {
    if (parseInt(numeroQuantidade.textContent) > 1) {
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

function adicionarAoCarrinho(nome, valor, quantidade) {
    const itemExistente = itensCarrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        itensCarrinho.push({ nome, valor, quantidade });
    }

    totalCarrinho += valor * quantidade;
    decerCarrinho()

}

function atualizarCarrinho() {
    carrinhoProdutos.innerHTML = ''; 
    itensCarrinho.forEach(item => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('teste');
        divProduto.innerHTML += `
            <div class="produto-add">
            <div class="info-produtos">
                        <p class="nome-carrinho">${item.nome}</p>

                        <div class="valor-calculo">
                            <p class="quantidade-escolhida">${item.quantidade}x</p>
                            <p class="valor-unitario">@${item.valor.toFixed(2)}</p>
                            <p class="valor-pagar">$${(item.valor * item.quantidade).toFixed(2)}</p>
                        </div> 
                    <div class="apagar">
                <img class="img-remover" src="/img/icon-remove-item.svg" alt="Remover produto">
                </div>
            </div>
            </div>
        `;

        divProduto.querySelector('.img-remover').addEventListener('click', () => {
            removerDoCarrinho(item.nome);
        });

        carrinhoProdutos.appendChild(divProduto);
    });

    // Atualiza o total
    totalValor.textContent = `$${totalCarrinho.toFixed(2)}`;

    // Atualiza visibilidade do carrinho
    if (itensCarrinho.length === 0) {
        carrinhoCheio.classList.remove('ativo');
        carrinhoVazio.classList.add('ativo');
        tituloCarrinho.textContent = 'Seu Carrinho (0)';
    } else {
        carrinhoCheio.classList.add('ativo');
        carrinhoVazio.classList.remove('ativo');
        tituloCarrinho.textContent = `Seu Carrinho (${itensCarrinho.length})`;
    }
}

function removerDoCarrinho(nome) {
    const itemIndex = itensCarrinho.findIndex(item => item.nome === nome);

    if (itemIndex > -1) {
        const item = itensCarrinho[itemIndex];
        totalCarrinho -= item.valor * item.quantidade;

        itensCarrinho.splice(itemIndex, 1);
        atualizarCarrinho();
    }
    subirCarrinho()
}

function decerCarrinho() {
    const DivCarrinho = document.querySelector('.box-carrinho')
    const finalCcarrinho = document.querySelector('.final-carrinho')

    contcarrinho += 65
    DivCarrinho.style.maxHeight = `${contcarrinho}px`;
}

function subirCarrinho() {
    const DivCarrinho = document.querySelector('.box-carrinho')

    contcarrinho -= 45
    DivCarrinho.style.maxHeight = `${contcarrinho}px`;
}


atualizarCarrinho();
