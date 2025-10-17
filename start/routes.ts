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
const OtpsController = () => import('#controllers/otps_controller')
const UserReviewsController = () => import('#controllers/user_reviews_controller')

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

        router.get('/products', [UserReviewsController, 'show'])
        router.post('/products', [CartsController, 'store'])

        router.post('/home', [CartsController, 'store'])

        router.get('/cartPage', [CartsController, 'index']).as('cartPage')
        router.put('/cartPage/update/:cartItemId', [CartsController, 'update'])
        router.delete('/cartPage/:cartItemId', [CartsController, 'destroy'])

        router.get('/userPage', [UserDetailsController, 'show'])
        router.put('/userPage/update', [UserDetailsController, 'store'])
        router.get('/userProfile', [UserDetailsController, 'show'])

        router.get('/checkOut', [CheckoutsController, 'show'])
        router.post('/checkOut', [CheckoutsController, 'store'])

        router.get('/order/success', [CheckoutsController, 'paymentSuccess']).as('paymentSuccess')
        router.get('/order/failure', [CheckoutsController, 'paymentFailure']).as('paymentFailure')

        router.get('/orderResult', [CheckoutsController, 'renderResult']).as('orderResult')
    }).use(middleware.auth())

// Public routes that redirect if not authenticated
router.
    group(() => {
        router.get('/signUp', [UsersController, 'show'])
        router.post('/signUp', [UsersController, 'store'])

        router.get('/login', [UserLoginsController, 'show'])
        router.post('/login', [UserLoginsController, 'store'])

        router.get('/verifyOtp', [OtpsController, 'show'])
        router.post('/verifyOtp', [OtpsController, 'verify'])

        router.post('/logout', [UserLogoutsController, 'handle'])
    })

