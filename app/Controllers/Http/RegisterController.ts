import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'
import RegisterRequest from '../../Validators/RegisterValidator'

export default class RegisterController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(RegisterRequest)

    await prisma.user.create({
      data: { ...payload, password: await Hash.make(payload.password) },
    })

    session.flash('success', 'Your account have been created successfully')
    response.redirect().toRoute('auth.login')
  }
}
