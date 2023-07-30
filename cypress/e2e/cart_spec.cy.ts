describe('cart', () => {

  const BASE_URL = 'http://localhost:3000'

  it('reflects correct quantity after adding new item from product page', () => {
    // cy.clearAllSessionStorage()

    // go to product 2
    cy.visit(`${BASE_URL}/products/2`);

    // add one of product 2
    const addToCartButton = cy.get('#add-to-cart-button');
    addToCartButton.click();

    // check that there is 1 of product 2
    cy.visit(`${BASE_URL}/cart`);
    const quantity = cy.get('#product-quantity')
    
    quantity.should('contain','1');
  })

  it('increments existing quantity after adding item already-in-cart', () => {
    // go to product 1
    // add 1
    // increment quantity (from 1 to 2)
    // add 2 to cart
    // go to cart
    // check that are three of model 1
  })

  it('reflects correct costs after incrementing quality', () => {
    // increment product 2 (changes to 2)
    /* check that
        subtotal is (priceProduct1*3 + priceProduct2*2) && // 775*3+200*2 = $2725.00
        shipping is $20 && 
        tax is (subtotal*taxRate) && // 2725*0.0725 = $197.56
        discount is (tax) && // $197.56
        total is (subtotal + shipping + tax - discount) //2745.00
    */
  })

  it('reflects correct costs after decrementing quantity', () => {
    // decrement product 2 (changes to 1)
    /* check that
        subtotal is (priceProduct1*3 + priceProduct2*1) && // 775*3+200 = $2525.00
        shipping is $20 && 
        tax is (subtotal*taxRate) && // 2525*0.0725 = $183.06
        discount is (tax) && 
        total is (subtotal + shipping + tax - discount) // $2545.00
    */
  })

  it('reflects correct costs after a new item', () => {
    // go to product page
    // add one of product 3
    /* check that
        subtotal is (priceProduct1*3 + priceProduct2*1 + priceProduct3*1) && // 775*3+200+160 = $2685.00
        shipping is $20 && 
        tax is (subtotal*taxRate) && //2685*0.0725 = $194.66
        discount is (tax) && 
        total is (subtotal + shipping + tax - discount) // $2705.00
    */
  })

  it('cannot remove an item by decrementing the quantity', () => {
    // decrement product 3
    // check that quantity is still one
  })

  it('reflects correct total cost after removing second item in list', () => {
    // remove item 2
    /* check that
        subtotal is (priceProduct1*3 + priceProduct3*1) && // 775*3+160 = $2485.00
        shipping is $20 && 
        tax is (subtotal*taxRate) && // $180.16
        discount is (tax) && 
        total is (subtotal + shipping + tax - discount) // $2505.00
    */
  })

  it('reflects correct total cost after removing first item in list', () => {
    // remove item 1
    /* check that
        subtotal is (priceProduct3*1) && // $160
        shipping is $20 && 
        tax is (subtotal*taxRate) && //$11.60
        discount is (tax) && 
        total is (subtotal + shipping + tax - discount) // $180
    */
  })
})