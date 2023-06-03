import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string(
      {
        trim: true,
      },
      [
        rules.email(),
        rules.normalizeEmail({
          allLowercase: true,
        }),
      ]
    ),
    password: schema.string({}),
    rememberMe: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    'email.required': 'Please enter a valid email',
    'password.required': 'Please enter your password',
  }
}
