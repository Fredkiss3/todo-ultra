/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { validator } from '@ioc:Adonis/Core/Validator'
import type { Prisma } from '@prisma/client'

validator.rule(
  'notExists',
  async (value: string, options, { errorReporter, pointer, arrayExpressionPointer }) => {
    // @ts-expect-error
    const object = await prisma[options.model].findFirst({
      where: {
        [options.field]: value,
      },
    })

    if (object) {
      errorReporter.report(
        pointer,
        'notExists',
        `A ${options.model} with this ${options.field} already exist`,
        arrayExpressionPointer
      )
    }
  },
  ([options]: [{ model: Lowercase<Prisma.ModelName>; field?: string }]) => {
    return {
      async: true,
      compiledOptions: {
        ...options,
        field: options.field ?? 'id',
      },
    }
  }
)
