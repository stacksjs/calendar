import bcryptjs from 'bcryptjs'
import { Base64 } from 'js-base64'
import { MD5 } from 'crypto-js'
import { bcryptOptions } from '../../../config/hashing'

async function make(password: string, algorithm = 'bcrypt') {
  if (algorithm === 'bcrypt')
    return bcryptEncode(password)

  if (algorithm === 'base64')
    return base64Encode(password)

  throw new Error('Unsupported algorithm')
}

async function verify(password: string, hash: string, algorithm = 'bcrypt') {
  if (algorithm === 'bcrypt')
    return bcryptVerify(password, hash)

  if (algorithm === 'base64')
    return base64Verify(password, hash)

  throw new Error('Unsupported algorithm')
}

async function bcryptEncode(password: string) {
  const salt = await bcryptjs.genSaltSync(bcryptOptions.rounds)
  const hash = await bcryptjs.hash(password, salt)

  return hash
}

async function bcryptVerify(password: string, hash: string) {
  return await bcryptjs.compare(password, hash)
}

async function base64Encode(password: string) {
  return await Base64.encode(password)
}

async function base64Verify(password: string, hash: string) {
  return Base64.decode(hash) === password
}

async function md5Encode(password: string) {
  // eslint-disable-next-line no-console
  console.log('MD5(password) =', MD5(password).toString())
  return MD5(password)
}

export { make as makeHash, verify as verifyHash, base64Encode, base64Verify, bcryptEncode, bcryptVerify, md5Encode }
