import { Request, Response } from "express";
import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";



export class FindAllDeliveriesDeliverymanController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req;
    const findAllDeliveriesUseCase = new FindAllDeliveriesDeliverymanUseCase()

    const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman)

    return res.json(deliveries)
  }
}