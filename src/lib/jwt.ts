import * as jose from 'jose'

export const verifyJwt = async(jwt: string) => {
   const verified = await jose.jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
   )
   return verified
}