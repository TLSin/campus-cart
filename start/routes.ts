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

// router.on('/').renderInertia('home').use(middleware.auth())
router.get('/', async ({ auth, response, inertia }) => {
    if (await auth.use('web').check()) {
        return response.redirect('/home')
    }
    return inertia.render('login')
})

router.
    group(() => {
        router.get('/home', [ProductsController, 'index'])

        router.get('/dailyProduct', [ProductsController, 'index'])
        router.get('/feature', [ProductsController, 'index'])
        router.get('/topProduct', [ProductsController, 'index'])
        router.get('/product/:id', [ProductsController, 'show'])

        router.post('/cartPage', [CartsController, 'store'])
        router.get('/cartPage', [CartsController, 'index'])
        router.put('/cartPage/update/:cartItemId', [CartsController, 'update'])
        router.delete('/cartPage/:cartItemId', [CartsController, 'destroy'])

        router.get('/userPage', async ({ auth, inertia }) => {
            const user = auth.user

            return inertia.render('userPage', {
                user: {
                    id: user?.studentId,
                    fName: user?.firstName,
                }
            })
        })
    }).use(middleware.auth())

// router.on('/shop').renderInertia('shopPage').use(middleware.auth())
// router.on('/search').renderInertia('searchResults')
// router.on('/cart').renderInertia('cartPage').use(middleware.auth())
// router.on('/user').renderInertia('userPage').use(middleware.auth())

router.
    group(() => {
        router.on('/signUp').renderInertia('signUp')
        router.post('/signUp', [UsersController, 'store'])
        router.on('/login').renderInertia('login')
        router.post('/login', [UserLoginsController, 'store'])
        router.post('/logout', [UserLogoutsController, 'handle'])
    })

