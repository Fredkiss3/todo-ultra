import Cache from '@ioc:Adonis/Addons/Cache'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({ view }: HttpContextContract) {
    const tasks = await Cache.remember('tasks', null, async () => {
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
  }
}
