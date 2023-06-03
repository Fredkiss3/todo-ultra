import type { Prisma, PrismaClient } from '@prisma/client'

declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    notExists<TModel extends Lowercase<Prisma.ModelName>>(options: {
      model: TModel
      field?: keyof Parameters<PrismaClient[TModel]['create']>[0]['data']
    }): Rule
  }
}
