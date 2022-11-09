/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import * as ItemService from './items.service';
import { BaseItem, Item } from './item.interface';

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

itemsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);

    if (!item) {
      return res.status(404).send('item not found');
    }

    res.status(200).send(item);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;

    const newItem = await ItemService.create(item);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const itemUpdate: Item = req.body;

    const updatedItem = await ItemService.update(id, itemUpdate);

    if (!updatedItem) {
      return res.status(404).send("item doesn't exist");
    }

    res.status(200).json(updatedItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    await ItemService.remove(id);
    res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
