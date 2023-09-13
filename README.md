# Sun Co. Shoes - Demo E-Commerce Site

A basic e-commerce store with items and a cart, based on this [design](https://www.figma.com/community/file/1265784090042206235).

YouTube Video Demo: [https://youtu.be/OnRkHUSd4uU](https://youtu.be/OnRkHUSd4uU)

## Technologies Used

- TypeScript
- React
- json-server
- CSS
- Cypress
- git

## Features

### Home Page

#### Header
![Header](https://github.com/rickythewriter/sunco-shoes/blob/master/docs/screens/home-header.png?raw=true)

#### List of Four Items
![List](https://github.com/rickythewriter/sunco-shoes/blob/master/docs/screens/home-list.png?raw=true)

### Product Page
![Product Page](https://github.com/rickythewriter/sunco-shoes/blob/master/docs/screens/product.png?raw=true)
- Information
- Image Carousel
- Quantity Selector
- Add Items

### View Cart
![View Cart](https://github.com/rickythewriter/sunco-shoes/blob/master/docs/screens/view-cart.png?raw=true)
- Summary of Charges
- Thumbnail and Quantity

### Responsive Design
![Responsive](https://github.com/rickythewriter/sunco-shoes/blob/master/docs/screens/responsive.png?raw=true)

## Installation

1. Clone this repository.
      ```bash
      git clone https://github.com/rickythewriter/sunco-shoes
      ```

2. Navigate into the repository.

3. Install dependencies.

      ```bash
      npm install
      ```

4. In a terminal, run the mock server, within the repository directory.

   ```bash
   npx json-server -p 4200 --watch db.json 
   ```

5. In a separate terminal, run the React app, within the repository directory.

   ```bash
   npm start
   ```

## Bonus: Automated Testing of Important Business Logic

![Integration Tests](https://github.com/rickythewriter/sunco-shoes/blob/master/docs/screens/tests.png?raw=true)

Use command `npx cypress open` to run test suite.

## Wiki Docs

Includes database schema, and front-end routes.

https://github.com/rickythewriter/sunco-shoes/wiki

## Compromises

### Omission of Mobile Home Page Horizontal Scroll Buttons

Although this was on the wireframe, I had determined that the trade-off of building a special component to scroll, when swiping is both instinctive and simpler to implement, was not worth my time investment.

### Lengthy Fetch Hooks on Mount

Due to the time constraint, and the use of a mock server in place of a back-end framework, I could not query relational data idiomatically, such as with an ORM, and had also decided against using Redux to manage API calls. Instead, I fetched the necessary data within the relevant components' useEffect hooks.

### Slow Load Times for Images

Since this is only a sample project, I hosted the dummy images on a GitHub repository, instead of using a faster blob storage solution.

## Creator - Ricky Thang

- [GitHub](https://github.com/rickythewriter)
- [Portfolio](https://www.rickythang.com)
- [LinkedIn](https://www.linkedin.com/in/ricky-thang-88307a100)


