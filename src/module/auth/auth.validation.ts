import {z} from "zod"
export const signUpSckema={
    body:z.strictObject({
            userName:z.string(),
            email:z.email(),
            password:z.string().min(6,{error:'password must be at least 6 charcters'}),
            confirmPassword:z.string(),
    }).superRefine((data, ctx)=>{
     if (data.password!==data.confirmPassword) {
       ctx.addIssue({code:'custom',path: ["confirmPassword"],message:'password is not matched'})
     }
    })
}
export const loginSckema={
  body:z.strictObject({
      email:z.email(),
      password:z.string().min(6,{error:'password must be at least 6 charcters'}),
  })
}