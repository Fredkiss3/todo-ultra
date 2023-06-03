import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginRequest from '../../Validators/LoginValidator'

export default class SessionController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async store({ request, session, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginRequest)

    await auth.attempt(payload.email, payload.password, Boolean(payload.rememberMe))

    session.flash('success', 'Logged in successfully')
    response.redirect().toRoute('home.index')
  }

  public async destroy({ session, response, auth }: HttpContextContract) {
    await auth.logout()

    session.flash('success', 'Logged out successfully')
    response.redirect().toRoute('auth.login')
  }
}
