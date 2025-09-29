/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
router.on('/Login').renderInertia('Login')
router.on('/Signup').renderInertia('Signup')
router.on('/homePage').renderInertia('homePage')