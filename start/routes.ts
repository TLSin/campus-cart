/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () =>  import('#controllers/users_controller')

router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')
router.on('/signUp').renderInertia('signUp')
router.on('/shopPage').renderInertia('shopPage')
router.on('/search').renderInertia('searchResults')
router.on('/cartPage').renderInertia('cartPage')
router.on('/userPage').renderInertia('userPage')
// router.post('/signUp', [UsersController, 'store']).as('signUp.store')

