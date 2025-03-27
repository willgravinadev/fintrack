import { randomUUID } from "node:crypto";

export class User {
  id: string
  name: string
  email: string
  password: string

  private constructor(input: { id: string; name: string; email: string; password: string }) {
    this.id = input.id
    this.name = input.name
    this.email = input.email
    this.password = input.password
  }

  static createNewUser(input: { name: string; email: string; password: string }) {
    return new User({
      id: randomUUID(),
      name: input.name,
      email: input.email,
      password: input.password
    })
  }
}
