// import { createHash } from 'crypto'
// import bcryptAlgo from 'bcrypt'
// import { bcryptOptions } from '../../../config/hashing'

// async function base64(password: string) {
// return await createHash('base64').update(password).digest()
// }

// async function md5(password: string) {
// return await createHash('md5').update(password).digest('hex')
// }

// async function bcrypt(password: string) {
//   const salt = await bcryptAlgo.genSalt(bcryptOptions.rounds)

//   return await bcryptAlgo.hash(password, salt)
// }

// async function make(password: string, type: 'bcrypt' | 'md5' = 'bcrypt') {
//   if (type === 'bcrypt')
//     return await bcrypt(password)

//   return await md5(password)
// }

// export { base64, md5 }
export { }
