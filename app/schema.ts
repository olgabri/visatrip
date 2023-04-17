import { z } from 'zod'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  console.log(issue)

  if (issue.code === z.ZodIssueCode.invalid_type) {
    return { message: 'Обязательное поле' }
  }

  return { message: ctx.defaultError }
}
  
z.setErrorMap(customErrorMap)  

export const formSchema = z.object({
  countryVac: z.string(),
  email: z.string().email('Неверная почта, проверьте правильность написания'),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.number(),
  sex: z.string(),
  relationshipStatus: z.string(),
  address: z.string(),
  city: z.string(),
  region: z.string(),
  countryAddress: z.string(),
  timeUnit: z.string(),
  timeAddress: z.number(),
  timeVac: z.string(),
  ownershipStatus: z.string(),
  passportNumber: z.string(),
  passportIssueAuthority: z.string(),
  passportIssueDate: z.date(),
  passportExpiryDate: z.date(),
  citizenship: z.string(),
  countryOfBirth: z.string(),
  placeOfBirth: z.string()
})

export type Fields = z.infer<typeof formSchema>
