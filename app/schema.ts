import { z } from 'zod'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  console.log(issue);

  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "Обязательное поле" };
    }
  }

  return { message: ctx.defaultError };
};
  
z.setErrorMap(customErrorMap);  

export const formSchema = z.object({
  countryVac: z.string(),
  email: z.string().email('Неверная почта, проверьте правильность написания')
})

export type Fields = z.infer<typeof formSchema>
