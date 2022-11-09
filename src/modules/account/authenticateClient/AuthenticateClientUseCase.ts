import prisma from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateClient {
  username: string,
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // receber username e password (ok)
   
    //verificar se username está cadastrado (ok)
    const client = await prisma.clients.findFirst({where: {
      username
    }})

    if(!client) {
      throw new Error("Username or Password is incorrect")
    }

    //verificar se senha corresponde ao username (ok)
    const passwordMatch = await compare(password, client.password);
    if (!passwordMatch) {
      throw new Error("Username or Password is incorrect")
    }
    //gerar token
    const token = sign({username}, "teste123", {
      subject: client.id,
      expiresIn: "1d"
    })
    return token
  }
}