import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileSettingsValidator from '../../Validators/ProfileSettingsValidator'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class ProfileController {
  public async index({ view }: HttpContextContract) {
    return view.render('profile/index')
  }

  public async update({ request, auth, session, response }: HttpContextContract) {
    const payload = await request.validate(ProfileSettingsValidator)

    const user = auth.user

    await prisma.user.update({
      data: {
        firstName: payload.firstName,
      },
      where: {
        id: user!.id,
      },
    })

    session.flash('success', 'Your settings have been updated successfully')
    response.redirect().toRoute('profile.index')
  }
}
