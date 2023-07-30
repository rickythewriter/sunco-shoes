describe('view cart button', () => {
    it('displays no quantity when cart is empty', () => {
        // clear session
        cy.clearAllSessionStorage()
        // check that there is no quantity next to view cart button
        cy.visit('/');

    })

    it('displays product-model quantity, 1, when first item is added', () => {
        // go to product page
        // add one product to cart
        // check that quantity in view cart button is 1
    })

    it('does not increment product-model quantity, when increasing quantity of a product already-in-cart', () => {
        // add two more of product 1 to cart
        // check that quantity did not increase
    })

    it('increments product-model quantity, when a different product model is added to cart for the first time', () => {
        // go to home page
        // go to product 2
        // add one to cart
        // check that quantity in view cart button is 2
    })

    it('decrements product-model quantity, when an item of a product model is removed from cart', () => {
        // go to cart
        // remove item 2
        // check that quantity in view cart button is 1
    })
})

describe('cart', () => {

    cy.clearAllSessionStorage()

    it('reflects correct quantity and item cost after adding new item from product page', () => {
        // go to home page
        cy.visit('/');
        
        // go to product 2
        const link = cy.findByRole('link', {
            name: /product preview image nike nike gamma force \$200/i
        });
        link.click();
        
        // add one of product 2
        const addToCartButton = cy.findByText(/add to cart/i);

        // check that there is 1 of product 2
        cy.visit('/cart');
        const quantity = cy.querySelector('#quantity-selector > p:nth-child(2)')

        expect(quantity).to.equal('1');
    })

    it('increments existing quantity after adding item already-in-cart', () => {
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