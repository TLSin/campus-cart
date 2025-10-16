/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const UserLoginsController = () => import('#controllers/user_logins_controller')
const UserLogoutsController = () => import('#controllers/user_logouts_controller')
const ProductsController = () => import('#controllers/products_controller')
const CartsController = () => import('#controllers/carts_controller')
const ShopsController = () => import('#controllers/shops_controller')
const CheckoutsController = () => import('#controllers/check_outs_controller')
const UserDetailsController = () => import('#controllers/user_details_controller')
const ResultsController = () => import('#controllers/results_controller')


// router.on('/').renderInertia('home').use(middleware.auth())
router.get('/', async ({ auth, response, inertia }) => {
    if (await auth.use('web').check()) {
        return response.redirect('/home')
    }
    return inertia.render('login')
})

// Public routes that can be accessed without authentication
router.group(() => {
    router.get('/home', [ProductsController, 'index'])
    router.get('/products/:productId', [ShopsController, 'show'])
    // router.get('/resultPage', [ResultsController, 'show'])
    router.get('/resultPage/:id', [ResultsController , 'show'])
    // router.on('/resultPage').renderInertia('resultPage')
})

// Private routes that only authenticated users can access
router.
    group(() => {
        router.get('/dailyProduct', [ProductsController, 'index'])
        router.get('/feature', [ProductsController, 'index'])
        router.get('/topProduct', [ProductsController, 'index'])
        router.post('/products', [CartsController, 'store'])
        router.post('/home', [CartsController, 'store'])
        router.get('/cartPage', [CartsController, 'index'])
        router.put('/cartPage/update/:cartItemId', [CartsController, 'update'])
        router.delete('/cartPage/:cartItemId', [CartsController, 'destroy'])

        router.get('/userPage', [UserDetailsController, 'show'])
        router.put('/userPage/update', [UserDetailsController, 'store'])
        router.get('/userProfle', [UserDetailsController, 'show'])

        router.get('/checkOut', [CheckoutsController, 'show'])

    }).use(middleware.auth())

// Public routes that redirect if not authenticated
router.
    group(() => {
        router.on('/signUp').renderInertia('signUp')
        router.post('/signUp', [UsersController, 'store'])
        router.on('/login').renderInertia('login')
        router.post('/login', [UserLoginsController, 'store'])
        router.post('/logout', [UserLogoutsController, 'handle'])
    })

