const Product = require('../models/product');
const Cart=require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req,res,next)=>{
  const prodId=req.params.productId;
  Product.findById(prodId,product=>{
    res.render('shop/product-detail',{
      path:'/products',
      pageTitle:product.title,
      product:product

    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products).then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch(err=>console.log(err));
  ;
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart =(req, res, next) => {
  const prodId=req.body.productId;
  const size=req.body.size;
  Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,size,product.price)
  })
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};