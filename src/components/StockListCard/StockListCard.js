import React from 'react';
import './index.css';

const CartCard = props => {
    return (
        <div>
            <div className="StockListCard">
                <div className="cart">
                    <ul className="cartWrap">
                        <li className="items">
                            <div className="infoWrap">
                                <div className="cartSection"><img src="//picsum.photos/720?random=1" alt="" className="itemImg" />
                                    <h3>Item Name 1</h3>
                                    <p><input type="text" className="qty" placeholder="3" /> x $5</p>
                                    <p className="stockStatus out">Out of Stock</p>
                                </div>
                                <div className="prodTotal cartSection">
                                    <p>$99</p>
                                </div>
                                <div className="cartSection removeWrap"><a href="#" className="remove">x</a></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="promoCode">
                    <label for="promo">Have A Promo Code?</label>
                    <input type="text" name="promo" placholder="Enter Code" />
                </div>

                <div className="subtotal">
                    <ul>
                        <li className="totalRow"><span className="label">Subtotal</span><span className="value">$999</span></li>
                        <li className="totalRow"><span className="label">Shipping</span><span className="value">$999</span></li>
                        <li className="totalRow"><span className="label">Tax</span><span className="value">$999</span></li>
                        <li className="totalRow final"><span className="label">Total</span><span className="value">$999</span></li>
                        <li className="totalRow"><a href="#" className="btn continue">Checkout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartCard;
