import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class GithubOAuthController {
  public async redirect({ ally, request, auth }: HttpContextContract) {
    return ally.use('github').redirect((redirectRequest) => {
      if (auth.isLoggedIn) {
        const query = request.qs()
        if (query.link_account === 'true') {
          redirectRequest.param(
            'redirect_uri',
            `${Env.get('GITHUB_CLIENT_REDIRECT_URI')}?link_account=true`
          )
        }
      }
    })
  }

  public async callback({ ally, session, response, auth, request }: HttpContextContract) {
    const github = ally.use('github')

    /**
     * User has explicitly denied the login request
     */
    if (github.accessDenied()) {
      session.flash('github.auth.error', 'You denied the access to the github account')
      return response.redirect().toRoute('auth.login')
    }

    /**
     * Unable to verify the CSRF state
     */
    if (github.stateMisMatch()) {
      session.flash('github.auth.error', 'Request expired. Retry again')
      return response.redirect().toRoute('auth.login')
    }

    /**
     * There was an unknown error during the redirect
     */
    if (github.hasError()) {
      session.flash('github.auth.error', 'An unknown error happened. Retry again')
      return response.redirect().toRoute('auth.login')
    }

    const githubUser = await github.user()

    const query = request.qs()

    // In case of account linking
    if (query.link_account === 'true') {
      if (auth.isLoggedIn) {
        const user = auth.user

        await prisma.user.update({
          data: {
            githubId: githubUser.id.toString(),
          },
          where: {
            id: user!.id,
          },
        })

        session.flash(
          'success',
          'Your github account has been associated, you can now login with it'
        )
        return response.redirect().toRoute('profile.index')
      } else {
        session.flash(
          'github.auth.error',
          'You cannot associate an account without being logged in'
        )
        return response.redirect().toRoute('auth.login')
      }
    }

    // In case of login
    const user = await prisma.user.findFirst({
      where: { githubId: githubUser.id.toString() },
    })

    if (user) {
      await auth.login(user)
      return response.redirect().toRoute('home.index')
    } else {
      session.flash(
        'github.auth.error',
        'Please create an account first and associate your github account to be able to login with Github'
      )
      return response.redirect().toRoute('auth.login')
    }
  }
}
