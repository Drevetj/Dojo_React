import React from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1, total: 50 },
  { id: 2, name: 'produit 2', price: 75, quantity: 1, total: 75 },
  { id: 3, name: 'produit 3', price: 20, quantity: 1, total: 20 }
];

function App () {
  const [products, setProducts] = React.useState(initialProductList)

  function handleQuantity(event, product) {
    var newQuantity = parseInt(event.target.value)
    var newPrice    = newQuantity * product.price || 0

    if (newQuantity === 0) {
      return askForRemove(product)
    }

    var newProduct = products.map((oldProduct) => {
      if (oldProduct.id === product.id) {
        return {...product, quantity: newQuantity, total: newPrice}
      } else {
        return {...oldProduct}
      }
    })

    setProducts(newProduct)
  }

  function askForRemove(product) {
    if(window.confirm("Etes-vous sûr de bien vouloir retirer ce produit de la liste ?")) {
      setProducts(products.filter(p => p !== product))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const name  = event.target.elements.nameInput.value
    const price = parseInt(event.target.elements.priceInput.value)
    const newId = products.length + 1
    setProducts([...products, {id: newId, name: name, price: price, quantity: 1, total: price}])
  }

  function Total() {
    let total = products.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.total
    }, 0)

    return <p>Montant de la commande : {total} €</p>
  }

  return (
    <div className='App'>
      <h1>Ma commande</h1>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix total</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <input
                  value={product.quantity}
                  type="number"
                  min="0"
                  onChange={(event) => handleQuantity(event, product)} />
              </td>
              <td>{product.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Total />

      <form onSubmit={handleSubmit}>
        <h2>Ajouter un produit</h2>

        <div className="field">
          <label htmlFor="nameInput">Nom :</label>
          <input id="nameInput" type="text" />
        </div>

        <div className="field">
          <label htmlFor="priceInput">Prix :</label>
          <input id="priceInput" type="number" min="0" />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default App;
