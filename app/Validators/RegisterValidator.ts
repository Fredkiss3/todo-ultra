import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({
      trim: true,
    }),
    email: schema.string(
      {
        trim: true,
      },
      [
        rules.email(),
        rules.normalizeEmail({
          allLowercase: true,
        }),
        rules.notExists({ model: 'user', field: 'email' }),
      ]
    ),
    password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
  })

  public messages: CustomMessages = {
    'firstName.required': 'Please enter your first name',
    'email.required': 'Please enter a valid email',
    'email.email': 'Please enter a valid email',
    'email.notExists': 'This email is already used by another user',
    'password.required': 'Please enter a password',
    'password.confirmed': 'Password do not match',
    'password_confirmation.confirmed': 'Your passwords do not match',
    'password.minLength': 'Your password should have a minimum of 6 characters',
  }
}
