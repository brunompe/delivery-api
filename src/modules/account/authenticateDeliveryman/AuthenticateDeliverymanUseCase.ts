import prisma from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
  username: string,
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // receber username e password (ok)
   
    //verificar se username está cadastrado (ok)
    const deliveryman = await prisma.deliveryman.findFirst({where: {
      username
    }})

    if(!deliveryman) {
      throw new Error("Username or Password is incorrect")
    }

    //verificar se senha corresponde ao username (ok)
    const passwordMatch = await compare(password, deliveryman.password);
    if (!passwordMatch) {
      throw new Error("Username or Password is incorrect")
    }
    //gerar token
    const token = sign({username}, "teste123", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })
    return token
  }
}