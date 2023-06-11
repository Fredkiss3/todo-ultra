import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileSettingsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({
      trim: true,
    }),
  })

  public messages: CustomMessages = {
    'firstName.required': 'Please enter your first name',
  }
}
