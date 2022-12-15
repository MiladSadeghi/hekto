<p align="center">
  <a href="https://hekto.miladsdgh.ir" rel="noopener">
 <img width=200px height=200px src="https://s2.uupload.ir/files/hekto_ndxi.png" alt="Bot logo"></a>
</p>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Langugae](https://img.shields.io/github/languages/top/miladsadeghi/hekto)]()

</div>

---

<p align="center"> ECommerce application built with React, Redux, Typescript, Firebase and Tailwind.
    <br>
</p>

## 📝 Table of Contents

- [About](#about)
- [Demo / Working](#demo)
- [Usage](#usage)
- [Getting Started](#getting_started)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

hekto, a complete furniture e-commerce application. Wish list, card, entry, registration, login without creating an account, etc. It is also fully responsive to be used on all devices.

## 🎥 Demo / Working <a name = "demo"></a>
### [Hekto Demo](https://hekto.miladsdgh.ir)

<details>
  <summary>Home Page</summary>

  ![Home Page](https://s2.uupload.ir/files/home_izvl.png "Home")
</details>

<details>
  <summary>Product List And Product Search Page</summary>

  ![Product List Page](https://s2.uupload.ir/files/product_list_5759.png "Product List, Product Search")
</details>

<details>
  <summary>Product page</summary>

  ![Product Page](https://s2.uupload.ir/files/product_page_4emg.png "Product Page ")
</details>

<details>
  <summary>Contact Us Page</summary>

  ![Contact Us Page](https://s2.uupload.ir/files/contact-us_1emq.png "Contact Us Page")
</details>

<details>
  <summary>About Us Page</summary>

  ![About Us Page](https://s2.uupload.ir/files/about-us_kdyo.png "About Us Page")
</details>

<details>
  <summary>Wishlist Page</summary>

  ![Wishlist Page](https://s2.uupload.ir/files/wishlist_mnvd.png "Wishlist Page")
</details>

<details>
  <summary>Cart Page</summary>

  ![Cart Page](https://s2.uupload.ir/files/cart_55b1.png "Cart Page")
</details>

<details>
  <summary>Checkout Page</summary>

  ![Checkout Page](https://s2.uupload.ir/files/checkout_bub7.png "Checkout Page")
</details>

<details>
  <summary>Faq Page</summary>

  ![Faq Page](https://s2.uupload.ir/files/faq_q87h.png "Faq Page")
</details>

<details>
  <summary>404 Page</summary>

  ![Faq Page](https://s2.uupload.ir/files/404_t3hg.png "Faq Page")
</details>

## 🎈 Usage <a name = "usage"></a>

You can only use hekto in university projects! Otherwise, I don't think it will work for you.

## 🏁 Getting Started <a name = "#getting_started"></a>

### Install

```javascript
npm i
```

### Firebase setup and configuration

for setup and configure firebase you should take multiple steps.

- take the firebase SDK configure from your project dashboard.

- make .env.local file and set the firebase config as environment.

```text
REACT_APP_API_KEY=QIaaSyAvqfpibS4n0c0t24Wb2n1p7D7i-lIFG
REACT_APP_AUTH_DOMAIN=your.domain.com 
REACT_APP_DATABASE_URL=https://your-database.firebaseio.com 
REACT_APP_PROJECT_ID=project-q63B7 
REACT_APP_STORAGE_BUCKET=project-q63B7.appspot.com 
REACT_APP_MESSAGING_SENDER_ID=197358465898 
REACT_APP_APP_ID=1:592878412755:web:5a7414400a3566757e88gf 
REACT_APP_MEASUREMENT_ID=F-D6PS35JZV3
```

#### (everything entered on top is fake! you should set yourself config. i just put as example)

### Run as development

```text
npm start
```

## 🛒 Product

### Add product to realtime database

if you want to added product to yours database, You must follow a specific schema.

```typescript
type ProductColors = {
  name: string;
  code: string;
}

type ProductImagesByColor = {
  [name: string]: string[]
}

type Product = {
  category: string;
  colors?: ProductColors[],
  id: string;
  imagesByColor?: ProductImagesByColor,
  price: string;
  specifications: string[],
  title: string;
  images?: any;
  discount?: string;
  section?: string;
  comments?: [];
}
```

### Questions ?

whats section on the product schema?
> <p>
>  if you have section like below: <br />
>   <img src="https://s2.uupload.ir/files/screenshot_2022-12-15_191057_cas4.png">
> 
>   <br />
> 
>   the section parameter will be a one of the bottom button and the Latest Product will be category.
> </p>

## ✍️ Authors <a name = "authors"></a>

- [@MiladSadeghi](https://github.com/MiladSadeghi) - Idea & Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Thanks to [SaberAli](https://bio.fm/surfauxion) for designing hekto
