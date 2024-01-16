import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import AddCategory from "../views/Category/AddCategory";
import Category from "../views/Category/CategoryView";
import EditCategory from "../views/Category/EditCategory";
import AddProduct from "../views/Product/AddProduct";
import Product from "../views/Product/ProductView";
import EditProduct from "../views/Product/EditProduct";
import ShowDetails from "../views/Product/ShowDetails";
import Signup from "../views/SignupView";
import Signin from "../views/SigninView";
import WishList from "../views/Product/WishList";
import Cart from "../views/Cart/CartView";
import Success from "../views/Payment/PaymentSuccess";
import Failed from "../views/Payment/PaymentFailed";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/admin/category/add",
    name: "AddCategory",
    component: AddCategory
  },
  {
    path: "/admin/category",
    name: "AdminCategory",
    component: Category,
  },
  {
    path: "/admin/category/:id",
    name: "EditCategory",
    component: EditCategory
  },
  {
    path: "/admin/product/add",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/admin/product",
    name: "AdminProduct",
    component: Product,
  },
  {
    path: "/admin/product/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path : '/product/show/:id',
    name : 'ShowDetails',
    component: ShowDetails
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/wishlist',
    name: 'WishList',
    component: WishList
  },
  {
    path : '/cart',
    name : 'Cart',
    component : Cart
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component:Success
  },
  {
    path: '/payment/failed',
    name: 'PaymentFailed',
    component:Failed
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
