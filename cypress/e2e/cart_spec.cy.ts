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

  it('increments existing quantity after adding item already-in-cart', () => {
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

})