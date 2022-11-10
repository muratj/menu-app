import { NextFunction, Request, response, Response } from 'express';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = 'Resource not found';

  res.status(404).send(message);
};
