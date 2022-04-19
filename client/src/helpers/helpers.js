export function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

export function cartSum(cartProducts) {
  const productsPrice = cartProducts.map((product) => product.price)

  return productsPrice.reduce((acc, cur) => {
    return acc + cur
  }, 0)
}

export function cartProductCheck(id) {
  const userId = JSON.parse(localStorage.getItem('userData')).userId
  
  if (localStorage.getItem(`cartProducts-${userId}`))  {
    return localStorage.getItem(`cartProducts-${userId}`).includes(id)
  }

  return false
}

export function getItemsFromStorage() {
  const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).userId : '';

  return localStorage.getItem(`cartProducts-${userId}`) ? localStorage.getItem(`cartProducts-${userId}`).split(',') : [];
}

export function addToCartFn(id) {
  const userId = JSON.parse(localStorage.getItem('userData')).userId
  const cartProducts = localStorage.getItem(`cartProducts-${userId}`) || []

  if (cartProducts.length) {
    localStorage.setItem(`cartProducts-${userId}`, cartProducts + ',' + id)
  } else {
    localStorage.setItem(`cartProducts-${userId}`, id)
  }
}

export function removeFromCartFn(id) {
  const userId = JSON.parse(localStorage.getItem('userData')).userId
  const cartProducts = localStorage.getItem(`cartProducts-${userId}`).split(',') || []

  if (cartProducts.length) {
    const filteredProducts = cartProducts.filter(item => {
      return Number(item) !== id
    })

    localStorage.setItem(`cartProducts-${userId}`, filteredProducts)
  }
}

export function clearCartFn() {
  const userId = JSON.parse(localStorage.getItem('userData')).userId

  localStorage.setItem(`cartProducts-${userId}`, [])
}

export function getProductsId(products) {
  return products.map(product => {
    return product.id
  })
}