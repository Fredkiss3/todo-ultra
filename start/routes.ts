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
import Cache from '@ioc:Adonis/Addons/Cache'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

Route.get('/ping', () => {
  return 'Pong'
})

Route.get('/', async ({ view }) => {
  const tasks = await Cache.tags(['tasks']).remember('', null, async () => {
    // await prisma.task.createMany({
    //   data: [
    //     {
    //       title: 'eat',
    //       description: 'kebab',
    //     },
    //     {
    //       title: 'sleep',
    //       description: '',
    //     },
    //     {
    //       title: 'code',
    //       description: 'with coffee',
    //     },
    //   ],
    // })
    return (await prisma.task.findMany({})) ?? []
  })

  return view.render('home/index', {
    tasks: tasks,
  })
})

Route.group(() => {
  Route.get('/login', ({ view }) => view.render('auth/login'))
  Route.get('/register', ({ view }) => view.render('auth/register'))
}).prefix('/auth')

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
