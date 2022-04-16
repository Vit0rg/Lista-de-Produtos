const ul = document.querySelector('#containerListaProdutos ul');

function montarListaProdutos(listaProdutos) 
{
  listaProdutos.forEach((produto, index) => 
  {
    const li = document.createElement('li')
    li.classList.add('cardProdutos')
    li.setAttribute('id', [index])

    const img = document.createElement('img')
    img.classList.add('productImg')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const span = document.createElement('span')
    const components = document.createElement('ul')
    components.classList.add('components')
    produto.componentes.forEach((componente) => 
    {
      const liComponents = document.createElement('li')
      liComponents.innerText = `${componente}`
      components.appendChild(liComponents)
    })

    // Adicionando dados do produto aos elementos
    img.src = produto.img
    img.alt = produto.nome
    h3.innerText = produto.nome
    if (produto.promocao) 
    {
      p.innerText = `R$ ${produto.precoPromocao.toFixed(2)}`
      const hotSales = document.createElement('span')

      p.classList.add('reducedPrice')
      hotSales.innerText = 'Item em promoção!'
      hotSales.classList.add('hotSales')
      li.appendChild(hotSales)
    } 
    else 
    {
      p.innerText = `R$ ${produto.preco.toFixed(2)}`
    }

    span.innerText = produto.secao

    // Adicionando o elementos para o li

    li.appendChild(img)
    li.appendChild(h3)
    li.appendChild(p)
    li.appendChild(span)
    li.appendChild(components)

    ul.appendChild(li)

  });

  addEventToCategories()
  addEventToCategoriesCard()
  addEventToProductsImgs()
  
  const inputButton = document.querySelector('#containerBuscaPorNomes button')
  inputButton.addEventListener('click', searchFilter)
  inputButton.addEventListener('click', itensSectionTotalPrice)
  // verifyReducedPrices()
}
montarListaProdutos(produtos)
createCart()



function createCart() 
{
  const carts = document.querySelector('#containerCarrinho')
  const cartValues = document.createElement('div')
  cartValues.classList.add('cartValues')
  const cartTotal = document.createElement('p')
  cartTotal.innerText = `Preço total: R$ 0,00`
  cartTotal.classList.add('cartTotal')
  cartValues.appendChild(cartTotal)
  carts.appendChild(cartValues)
}


function addEventToCategories() 
{
  const categorias = document.querySelectorAll('menu ul li')
  categorias.forEach(categoria => 
  {
    categoria.addEventListener('click', filterProducts)
    categoria.addEventListener('click', itensSectionTotalPrice)
    categoria.addEventListener('click', showCart) 
  });
}

function addEventToCategoriesCard() 
{
  const categoriasCard = document.querySelectorAll('#containerListaProdutos ul li span')
  categoriasCard.forEach((categoria) => 
  {
    categoria.addEventListener('click', filterProductsCard)
  })
}

function addEventToProductsImgs() 
{
  const productsImgs = document.querySelectorAll('.cardProdutos')
  productsImgs.forEach((produto) => 
  {
    produto.addEventListener('click', showCart)
    produto.addEventListener('mouseenter', createAddToCartButton)
    produto.addEventListener('mouseleave', removeAddToCartButton)
  })
}

function createAddToCartButton(event) 
{
  const liButton = this
  const button = document.createElement('button')
  button.classList.add('addToCart--active')
  button.innerText = 'Adicionar ao carrinho'
  button.addEventListener('click', addItemToCart)
  liButton.appendChild(button)
}

function removeAddToCartButton(event) 
{
  event.target.removeChild(event.target.querySelector('.addToCart--active'))
}


function filterProductsCard(event) 
{
  const categoria = event.target.innerText
  const newProducts = []
  produtos.forEach((produto, index, produtos) => 
  {
    if (produto.secao === categoria) 
    {
      newProducts.push(produtos[index])
    }
  })
  montarListaProdutos(newProducts)
}


function filterProducts(event) 
{
  if (event.target.innerText === 'Todos os produtos') 
  {
    ul.innerHTML = ''
    montarListaProdutos(produtos);
  } 
  else 
  {
    const categoria = event.target.innerText
    const newProducts = []
    produtos.forEach((produto, index, produtos) => 
    {
      if (produto.secao === categoria) 
      {
        newProducts.push(produtos[index])
      }
    })
    ul.innerHTML = ''
    montarListaProdutos(newProducts)
  }
}

function searchFilter() 
{
  const input = document.querySelector('header menu input')
  const buscaDigitada = input.value.toLowerCase()
  const newProducts = []

  produtos.forEach((produto, index, produtos) => 
  {
    if (produto.nome.replaceAll('-', ' ').replaceAll(' ', '').toLowerCase().includes(buscaDigitada.replaceAll('-', ' ').replaceAll(' ', '').toLowerCase())) 
    {
      newProducts.push(produtos[index])
      return
    } 
    if (produto.secao.replaceAll('-', ' ').replaceAll(' ', '').toLowerCase().includes(buscaDigitada.replaceAll('-', ' ').replaceAll(' ', '').toLowerCase())) 
    {
      newProducts.push(produtos[index])
      return
    } 
    if (produto.categoria.replaceAll('-', ' ').replaceAll(' ', '').toLowerCase().includes(buscaDigitada.replaceAll('-', ' ').replaceAll(' ', '').toLowerCase())) 
    {
      newProducts.push(produtos[index])
      return
    }
  })
    ul.innerHTML = ''
    montarListaProdutos(newProducts)
    showCart()
}

function showCart() 
{
  const cart = document.querySelector('#valorDosProdutos')
  cart.style = 'display: inline-flex'
  itensSectionTotalPrice()
}

function itensSectionTotalPrice() 
{
  const itensSection = document.querySelectorAll('.cardProdutos')
  let totalPrice = 0
  const itensSectionValue = document.querySelector('#precoTotal')
  itensSection.forEach((preço) => 
  {
    totalPrice += Number(preço.querySelector('p').innerText.replace('R$', '').replace(',', '.'))
    //console.log(totalPrice)
    itensSectionValue.innerText = `R$ ${totalPrice.toFixed(2)}`
  })
}

let cartItems = []


function addItemToCart() 
{
  let cart = []
  const clickedItem = this.parentNode
  produtos.forEach((produto, index, produtos) => 
  {
    if (produto.nome === clickedItem.querySelector('h3').innerText) 
    {
      cart.push(produtos[index])
    }
  })
  cartRefresh(cart)
}

function removeItemFromCart() 
{
  const clickedItem = this.parentElement.parentNode
  const cart = document.querySelector('#containerCarrinho')
  cart.removeChild(clickedItem)
  refreshCartValues()
}

// function cartQuantityOfTheSame(cart) {

//     const quantidadeSpan = document.querySelectorAll('.quantidadeSpan')
//     cartItems.forEach((item, index) => {
//         if (!item.nome.includes(cart.nome)) {
//             cartRefresh(cart)
//         } else {
//             quantidadeSpan[index].innerText++
//         }
//     })

// }

function cartRefresh(cart) 
{
  const carts = document.querySelector('#containerCarrinho')
  carts.classList.add('#containerCarrinho')
  cart.forEach((produto) => 
  {
    const ul = document.createElement('ul')
    ul.classList.add('cartItems')

    const li = document.createElement('li')
    li.classList.add('cartItems__items')

    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const span = document.createElement('span')
    

    // const quantidade = document.createElement('p')
    // quantidade.classList.add('quantidade')

    const button = document.createElement('button')
    button.addEventListener('click', removeItemFromCart)
    button.classList.add('removeButton')
    button.innerText = 'Remover item'
    // const quantidadeSpan = document.createElement('span')
    // quantidadeSpan.classList.add('quantidadeSpan')


    img.src = produto.img  
    if (produto.promocao) 
    {
      p.innerText = `R$ ${produto.precoPromocao.toFixed(2)}`
    } 
    else 
    {
      p.innerText = `R$ ${produto.preco.toFixed(2)}`
    }

    // quantidade.innerText = 'Quantidade:'
    // quantidadeSpan.innerText = 0
    li.append(span)
    span.append(img, h3, p)
    ul.appendChild(li)
    // quantidade.appendChild(quantidadeSpan)
    // divQuantityAndButton.appendChild(quantidade)
    li.appendChild(button)
    carts.append(ul)
    cartItems.push(h3.innerText)
  })

  refreshCartValues()

}

function refreshCartValues() 
{
  const cartItems = document.querySelectorAll('.cartItems')
  let totalPrice = 0
  cartItems.forEach((item) => 
  {
    totalPrice += Number(item.querySelector('p').innerText.replace('R$', '').replace(',', '.'))
  })
  const cartTotal = document.querySelector('.cartTotal')
  cartTotal.innerText = `Preço total: R$ ${totalPrice.toFixed(2)}`
}