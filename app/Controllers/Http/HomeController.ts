import Cache from '@ioc:Adonis/Addons/Cache'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    if (auth.isLoggedIn) {
      const tasks = await Cache.remember('tasks', null, async () => {
        return (await prisma.task.findMany({})) ?? []
      })

      return view.render('home/logged-in', {
        tasks: tasks,
      })
    }

    return view.render('home/logged-out', {})
  }
}
