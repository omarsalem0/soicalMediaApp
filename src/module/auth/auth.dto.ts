import {z} from "zod"
import { loginSckema, signUpSckema } from "./auth.validation"

export type singUpDTO=z.infer<typeof signUpSckema.body>
export type loginDTO=z.infer<typeof loginSckema.body>