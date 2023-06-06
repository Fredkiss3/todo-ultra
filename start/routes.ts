/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', 'HomeController.index').as('home.index')

Route.group(() => {
  Route.get('/redirect', 'GithubOAuthController.redirect')
  Route.get('/callback', 'GithubOAuthController.callback')
}).prefix('/github')

Route.group(() => {
  Route.get('/register', 'RegisterController.create').as('auth.register')
  Route.post('/register', 'RegisterController.store')

  Route.get('/login', 'SessionController.create').as('auth.login')
  Route.post('/login', 'SessionController.store')
  Route.delete('/logout', 'SessionController.destroy').as('auth.logout')
}).prefix('/auth')

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
