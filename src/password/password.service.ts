import { Injectable } from '@nestjs/common'

import * as bcryptjs from 'bcryptjs'

/**
 * Service that deals with all the password related logics like
 * encryptation and comparison.
 */
@Injectable()
export class PasswordService {
  /**
   * Method that converts the informed password to a hashed one.
   *
   * @param password defines a string that represents the password sent
   * by the user.
   * @returns the hashed password.
   */
  async encrypt(password: string) {
    const salt = await bcryptjs.genSalt()
    return bcryptjs.hash(password, salt)
  }

  /**
   * Method that compares two passwords, that sent by the user and the
   * hashed one.
   *
   * @param password defines a string that represents the password sent
   * by the user.
   * @param hashedPassword defines a string that represents the hashed
   * password saved.
   * @returns true if the password mathces, otherwise false.
   */
  compare(password: string, hashedPassword: string) {
    return bcryptjs.compare(password, hashedPassword)
  }
}
