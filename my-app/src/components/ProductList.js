import React from 'react';
import productsData from '../data/product.json';

class ProductList extends React.Component {
  state = {
    cart: [],
    discount: false,
  };

  addToCart = (product) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }));
  };

  calculateTotalPrice = () => {
    const { cart, discount } = this.state;
    const totalPrice = cart.reduce((total, product) => total + (discount ? parseFloat(product.price) * 0.8 : parseFloat(product.price)), 0);
    return totalPrice.toFixed(2);
  };

  toggleDiscount = () => {
    this.setState((prevState) => ({
      discount: !prevState.discount,
    }));
  };

  render() {
    const { cart, discount } = this.state;

    return (
      <div>
        <h1>Ürünlerim</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {productsData.products.map((product) => (
            <div key={product.id} style={{ margin: '10px' }}>
              <img src={product.img} alt={product.id} style={{ width: '200px', height: '200px' }} />
              <p>Fiyat: {discount ? (parseFloat(product.price) * 0.8).toFixed(2) : parseFloat(product.price).toFixed(2)} TL</p>
              <p>Stok Durumu: {parseInt(product.stock, 10) > 0 ? "Stokta var" : "Stokta yok"}</p>
              <button onClick={() => this.addToCart(product)}>Sepete Ekle</button>
            </div>
          ))}
        </div>
        <div>
          <h2>Sepetim</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>{product.id}</li>
            ))}
          </ul>
          <p>Toplam Fiyat: {this.calculateTotalPrice()} TL</p>
          <button onClick={this.toggleDiscount}>{discount ? "İndirimi Kaldır" : "İndirim Yap (20%)"}</button>
          <button onClick={() => alert('Alışverişi tamamla')}>Alışverişi Tamamla</button>
        </div>
      </div>
    );
  }
}

export default ProductList;