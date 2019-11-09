import React from 'react';
import './index.css';

const ProductCard = props => {
    const items = [];

    for (var i = 0; i < 10; i++) {
        items.push(
            <div className="product-container">
              <div className="product-image">
                  <img src="//www.carlogos.org/logo/Tesla-logo.png" alt="" className="product-logo" />
                  <img src="//www.nathanielcars.co.uk/files/cache/800c17f209980ffe0c2985d55411c6ee.png" alt="" className="product-pic" />
              </div>

              <div className="product-details">
                  <header>
                      <h1>Car</h1>
                      <span className="colorCat">mint green</span>
                      <div className="price">
                          <span className="before">$999</span>
                          <span className="current">$99</span>
                      </div>
                  </header>
                  <article>
                      <h5>Description</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                      </p>
                  </article>
                  <div className="controls">
                      <div className="color">
                          <h5>color</h5>
                          <ul>
                              <li><a href="/" className="colors color-bdot1 active"></a></li>
                              <li><a href="/" className="colors color-bdot2"></a></li>
                              <li><a href="/" className="colors color-bdot3"></a></li>
                              <li><a href="/" className="colors color-bdot4"></a></li>
                              <li><a href="/" className="colors color-bdot5"></a></li>
                          </ul>
                      </div>
                      <div className="qty">
                          <h5>qty</h5>
                          <a href="/" className="option">(1)</a>
                      </div>
                  </div>
                  <div className="product-footer">
                      <button type="button">
                          <i className="fa fa-shopping-cart"></i>
                          <span>add to cart</span>
                      </button>
                  </div>
              </div>
            </div>
        )
    }
    return (
        <aside class="FilterCard">
        <div class="FilterCard-wrapper">
            <div class="filter-section-wrapper">
                <section class="filter-section">
                    <div class="filters">
                        <h5 class="filters__title"> Color </h5>
                        <div class="filters-item">
                            <div class="checkbox">
                                <input id="checkbox-1" type="checkbox" />
                                <label for="checkbox-1">R <span class="box"></span></label>
                            </div>
                            <span class="badgey">9</span>
                        </div>
                        <div class="filters-item">
                            <div class="checkbox">
                                <input id="checkbox-2" type="checkbox" />
                                <label for="checkbox-2">G <span class="box"></span></label>
                            </div>
                            <span class="badgey">99</span>
                        </div>
                        <div class="filters-item">
                            <div class="checkbox">
                                <input id="checkbox-3" type="checkbox" />
                                <label for="checkbox-3">B <span class="box"></span>
                                </label>
                            </div>
                            <span class="badgey">999</span>
                        </div>
                    </div>

                    <div class="filters">
                        <h5 class="filters__title"> Size </h5>
                        <div class="filters-item">
                            <div class="checkbox">
                                <input id="checkbox-5" type="checkbox" />
                                <label for="checkbox-5">Small <span class="box"></span></label>
                            </div>
                            <span class="badgey">9</span>
                        </div>
                        <div class="filters-item">
                            <div class="checkbox">
                                <input id="checkbox-6" type="checkbox" />
                                <label for="checkbox-6">Medium <span class="box"></span></label>
                            </div>
                            <span class="badgey">99</span>
                        </div>
                        <div class="filters-item">
                            <div class="checkbox">
                                <input id="checkbox-7" type="checkbox" />
                                <label for="checkbox-7">Large <span class="box"></span>
                                </label>
                            </div>
                            <span class="badgey">999</span>
                        </div>
                    </div>
                </section>
            </div>

            <section class="results-section">{items}</section>
        </div>
    </aside>
    )
}

export default ProductCard;
