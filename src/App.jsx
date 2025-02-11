/*   RUN THE SERVER APP FIRST  */

import Meals from './pages/Meals'
import EditFood from './pages/EditFood'
import FoodDetail from './pages/FoodDetail'
import NewFood from './pages/NewFood'
import RootLayout from './pages/RootLayout'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorBlock from './pages/ErrorBlock'

export const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorBlock />,
        children: [
            {index: true, element: <Meals />},
            {path: 'newFood', element: <NewFood />},
            {path: ':id', element: <FoodDetail />},
            {path: ':id/edit', element: <EditFood />},
        ],
    },
])

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App

// Points for this project:

// 1- Run the backend server (server.js) as well as the react application. This Express server is only for saving images.
//  and all other data will be saved in mockapi database.
// 2- I know it is not reasonable to use global styling in conjunction with twailwing or mui inline styling. But i used global
//  styling a bit in index.css file just for practicing how to use tailwind in a css file using @layer utilities{}. That is
//  only for learning and practicing purposes.
// 3- Search delay is because of debouncing featuer added. Means the search is triggred only when user stops typing for 1 second.

// Data array copied to mockapi.
/* [
    {
      "id": "m1",
      "name": "Mac & Cheese",
      "price": "8.99",
      "description": "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
      "image": "uploads/mac-and-cheese.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m2",
      "name": "Margherita Pizza",
      "price": "12.99",
      "description": "A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.",
      "image": "uploads/margherita-pizza.jpg",
      "date": "5 Oct 2023"
    },
    {
      "id": "m3",
      "name": "Caesar Salad",
      "price": "7.99",
      "description": "Romaine lettuce tossed in Caesar dressing, topped with croutons and parmesan shavings.",
      "image": "uploads/caesar-salad.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m4",
      "name": "Spaghetti Carbonara",
      "price": "10.99",
      "description": "Al dente spaghetti with a creamy sauce made from egg yolk, pecorino cheese, pancetta, and pepper.",
      "image": "uploads/spaghetti-carbonara.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m5",
      "name": "Veggie Burger",
      "price": "9.99",
      "description": "A juicy veggie patty served on a whole grain bun with lettuce, tomato, and a tangy sauce.",
      "image": "uploads/veggie-burger.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m6",
      "name": "Grilled Chicken Sandwich",
      "price": "10.99",
      "description": "Tender grilled chicken breast with avocado, bacon, lettuce, and honey mustard on a toasted bun.",
      "image": "uploads/grilled-chicken-sandwich.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m7",
      "name": "Steak Frites",
      "price": "17.99",
      "description": "Succulent steak cooked to your preference, served with crispy golden fries and herb butter.",
      "image": "uploads/steak-frites.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m8",
      "name": "Sushi Roll Platter",
      "price": "15.99",
      "description": "An assortment of fresh sushi rolls including California, Spicy Tuna, and Eel Avocado.",
      "image": "uploads/sushi-roll-platter.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m9",
      "name": "Chicken Curry",
      "price": "13.99",
      "description": "Tender pieces of chicken simmered in a rich and aromatic curry sauce, served with basmati rice.",
      "image": "uploads/chicken-curry.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m10",
      "name": "Vegan Buddha Bowl",
      "price": "11.99",
      "description": "A hearty bowl filled with quinoa, roasted veggies, avocado, and a tahini dressing.",
      "image": "uploads/vegan-buddha-bowl.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m11",
      "name": "Seafood Paella",
      "price": "19.99",
      "description": "A Spanish delicacy filled with saffron-infused rice, shrimp, mussels, and chorizo.",
      "image": "uploads/seafood-paella.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m12",
      "name": "Pancake Stack",
      "price": "8.99",
      "description": "Fluffy pancakes stacked high, drizzled with maple syrup and topped with fresh berries.",
      "image": "uploads/pancake-stack.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m13",
      "name": "Miso Ramen",
      "price": "12.99",
      "description": "A warming bowl of ramen with miso broth, tender pork, soft-boiled egg, and green onions.",
      "image": "uploads/miso-ramen.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m14",
      "name": "Beef Tacos",
      "price": "9.99",
      "description": "Three soft tortillas filled with seasoned beef, fresh salsa, cheese, and sour cream.",
      "image": "uploads/beef-tacos.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m15",
      "name": "Chocolate Brownie",
      "price": "5.99",
      "description": "A rich and fudgy brownie, topped with a scoop of vanilla ice cream and chocolate sauce.",
      "image": "uploads/chocolate-brownie.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m16",
      "name": "Lobster Bisque",
      "price": "14.99",
      "description": "A creamy soup made from lobster stock, aromatic vegetables, and a touch of brandy.",
      "image": "uploads/lobster-bisque.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m17",
      "name": "Mushroom Risotto",
      "price": "13.99",
      "description": "Creamy Arborio rice cooked with a medley of wild mushrooms and finished with parmesan.",
      "image": "uploads/mushroom-risotto.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m18",
      "name": "Eggplant Parmesan",
      "price": "11.99",
      "description": "Layers of breaded eggplant, marinara sauce, and melted mozzarella and parmesan cheeses.",
      "image": "uploads/eggplant-parmesan.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m19",
      "name": "Lemon Cheesecake",
      "price": "6.99",
      "description": "A creamy cheesecake with a tangy lemon flavor, served on a crumbly biscuit base.",
      "image": "uploads/lemon-cheesecake.jpg",
      "date": "4 Oct 2023"
    },
    {
      "id": "m20",
      "name": "Falafel Wrap",
      "price": "8.99",
      "description": "Crispy falafels wrapped in a warm pita with lettuce, tomatoes, and a tahini sauce.",
      "image": "uploads/falafel-wrap.jpg",
      "date": "4 Oct 2023"
    }
  ] */
