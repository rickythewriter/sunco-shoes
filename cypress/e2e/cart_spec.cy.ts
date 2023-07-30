describe('cart', () => {

  const BASE_URL = 'http://localhost:3000'

  it('reflects correct quantity and item cost after adding new item from product page', () => {

    // go to product 2
    cy.visit(`${BASE_URL}/products/2`);

    // add one of product 2
    const addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // check that there is 1 of product 2
    cy.visit(`${BASE_URL}/cart`);
    const quantity = cy.get('#product-quantity')
    quantity.should('contain','1');

    const itemCost = cy.get('.charge-amount')
    itemCost.should('contain', '$200.00');
  })

  it('increments existing quantity after adding item already-in-cart from product page', () => {
    // go to product 1
    const pathProduct1 = '/products/1'
    cy.visit(`${BASE_URL}/products/1`);

    // add 1
    const addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // increment quantity (from 1 to 2)
    const incrementButton = cy.get('.quantity-selector-control:last-child');
    incrementButton.click()

    // add 2 to cart
    addToCartButton.click();

    // go to cart
    cy.visit(`${BASE_URL}/cart`);

    // check that are three of model 1
    const quantity = cy.get('#product-quantity')
    quantity.should('contain', '3');
    
  })

  it('reflects correct costs after incrementing quantity', () => {
    
    // add one of product 2
    cy.visit(`${BASE_URL}/products/2`);
    const addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // increment product 2 (changes to 2) in cart
    cy.visit(`${BASE_URL}/cart`);
    const incrementButton = cy.get('.quantity-selector-control:last-child');
    incrementButton.click()

    // check that there are two of product 2
    const quantity = cy.get('#product-quantity')
    quantity.should('contain', '2');

    // check that charges are correct
    const subtotal = cy.get('.summary-row:first');
    subtotal.should('contain', '$400.00');

    const shipping = cy.get('.summary-row').contains('.summary-row', 'Shipping');
    shipping.should('contain', '$20.00');

    const tax = cy.get('.summary-row').contains('.summary-row', 'Tax');
    tax.should('contain', '$29.00');

    const discount = cy.get('.summary-row').contains('.summary-row', 'Discount');
    discount.should('contain', '$29.00');;

    const total = cy.get('#cart-summary > div:nth-child(7)');
    total.should('contain', '$420.00');
  })

  it('reflects correct costs after decrementing quantity', () => {
      // add one of product 2
      cy.visit(`${BASE_URL}/products/2`);
      const addToCartButton = cy.get('#add-to-cart-button');
      addToCartButton.click();

      // increment product 2 (changes to 2) in cart
      cy.visit(`${BASE_URL}/cart`);
      const incrementButton = cy.get('.quantity-selector-control:last-child');
      incrementButton.click()

      // decrement product 2 (changes to 1) in cart
      cy.visit(`${BASE_URL}/cart`);
      const decrementButton = cy.get('.quantity-selector-control:first-child');
      decrementButton.click()

      // check that there are two of product 2
      const quantity = cy.get('#product-quantity')
      quantity.should('contain', '1');

      // check that charges are correct
      const subtotal = cy.get('.summary-row:first');
      subtotal.should('contain', '$200.00');

      const shipping = cy.get('.summary-row').contains('.summary-row', 'Shipping');
      shipping.should('contain', '$20.00');

      const tax = cy.get('.summary-row').contains('.summary-row', 'Tax');
      tax.should('contain', '$14.50');

      const discount = cy.get('.summary-row').contains('.summary-row', 'Discount');
      discount.should('contain', '$14.50');;

      const total = cy.get('#cart-summary > div:nth-child(7)');
      total.should('contain', '$220.00');
  })

  it('reflects correct costs after adding more than one kind of item', () => {
    // add one of product 2
    cy.visit(`${BASE_URL}/products/2`);
    let addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // add one of product 3
    cy.visit(`${BASE_URL}/products/3`);
    addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // check that charges are correct
    cy.visit(`${BASE_URL}/cart`);

    const subtotal = cy.get('.summary-row:first');
    subtotal.should('contain', '$360.00');

    const shipping = cy.get('.summary-row').contains('.summary-row', 'Shipping');
    shipping.should('contain', '$20.00');

    const tax = cy.get('.summary-row').contains('.summary-row', 'Tax');
    tax.should('contain', '$26.10');

    const discount = cy.get('.summary-row').contains('.summary-row', 'Discount');
    discount.should('contain', '$26.10');;

    const total = cy.get('#cart-summary > div:nth-child(7)');
    total.should('contain', '$380.00');
  })

  it('cannot remove an item by decrementing the quantity', () => {
    // add one of product 2
    cy.visit(`${BASE_URL}/products/2`);
    const addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // decrement product 2 (from 1 to 1) in cart
    cy.visit(`${BASE_URL}/cart`);
    const decrementButton = cy.get('.quantity-selector-control:first-child');
    decrementButton.click()

    // check that there are two of product 2
    const quantity = cy.get('#product-quantity')
    quantity.should('contain', '1');
  })

  it('reflects correct total cost after removing second item in list', () => {
    // add three of product 1
    cy.visit(`${BASE_URL}/products/1`);
    let incrementButton = cy.get('.quantity-selector-control:last-child');
    incrementButton.click() // 2
    incrementButton.click() // 3
    let addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // add two of product 2
    cy.visit(`${BASE_URL}/products/2`);
    incrementButton = cy.get('.quantity-selector-control:last-child');
    incrementButton.click() // 2
    addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // add one of product 3
    cy.visit(`${BASE_URL}/products/3`);
    addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // remove product 2
    cy.visit(`${BASE_URL}/cart`);
    const removeButton = cy.get('.cart-item:nth-child(3)').contains('Remove');
    removeButton.click();

    // check that charges are correct
    const subtotal = cy.get('.summary-row:first');
    subtotal.should('contain', '$2485.00'); // 775*3 + 160

    const shipping = cy.get('.summary-row').contains('.summary-row', 'Shipping');
    shipping.should('contain', '$20.00');

    const tax = cy.get('.summary-row').contains('.summary-row', 'Tax');
    tax.should('contain', '$180.16');

    const discount = cy.get('.summary-row').contains('.summary-row', 'Discount');
    discount.should('contain', '$180.16');;

    const total = cy.get('#cart-summary > div:nth-child(7)');
    total.should('contain', '$2505.00');
  })

  it('reflects correct total cost after removing first item in list', () => {
    // add three of product 1
    cy.visit(`${BASE_URL}/products/1`);
    let incrementButton = cy.get('.quantity-selector-control:last-child');
    incrementButton.click() // 2
    incrementButton.click() // 3
    let addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // add two of product 2
    cy.visit(`${BASE_URL}/products/2`);
    incrementButton = cy.get('.quantity-selector-control:last-child');
    incrementButton.click() // 2
    addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // add one of product 3
    cy.visit(`${BASE_URL}/products/3`);
    addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // remove product 1
    cy.visit(`${BASE_URL}/cart`);
    const removeButton = cy.get('.cart-item:nth-child(2)').contains('Remove');
    removeButton.click();

    // check that charges are correct
    const subtotal = cy.get('.summary-row:first');
    subtotal.should('contain', '$560.00'); // 200*2 + 160

    const shipping = cy.get('.summary-row').contains('.summary-row', 'Shipping');
    shipping.should('contain', '$20.00');

    const tax = cy.get('.summary-row').contains('.summary-row', 'Tax');
    tax.should('contain', '$40.60');

    const discount = cy.get('.summary-row').contains('.summary-row', 'Discount');
    discount.should('contain', '$40.60');;

    const total = cy.get('#cart-summary > div:nth-child(7)');
    total.should('contain', '$580.00');
  })

})