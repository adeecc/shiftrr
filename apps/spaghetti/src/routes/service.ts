import express from 'express';
import { isLoggedIn, isAdminLoggedIn } from '../utils/auth';
import Service from '../models/service';

const router = express.Router();

// router.post('/create-service', (req: express.Request, res: express.Response) => {
//     const {seller, name, description, startingPrice, rating} = req.body.data;
//     const new_service = new Service({
//         seller,
//         name,
//         description,
//         startingPrice,
//         rating
//     }).save();
//     res.json(new_service);
// })

router.get('/services', async (req: express.Request, res: express.Response) => {
  try {
    return res.json(await Service.find());
  } catch (e: any) {
    return res.status(400).json({
      err: 'Unable to fetch all Services',
    });
  }
});

router.get(
  '/:serviceId',
  async (req: express.Request, res: express.Response) => {
    const serviceID = req.params.serviceId;
    try {
      return res.json(await Service.findById(serviceID));
    } catch (e: any) {
      return res.status(400).json({
        err: 'Invalid serviceId',
      });
    }
  }
);

router.put(
  '/services',
  isLoggedIn,
  async (req: express.Request, res: express.Response) => {
    try {
      await Service.findOneAndUpdate({ _id: req.user }, req.body);
      return res.json(await Service.findById(req.user));
    } catch (e: any) {
      return res.status(400).json({
        err: 'Service could not be updated',
        msg: e,
      });
    }
  }
);

router.put(
  '/:serviceId',
  isLoggedIn,
  async (req: express.Request, res: express.Response) => {
    try {
      await Service.findOneAndUpdate({ _id: req.params.serviceId }, req.body);
      return res.json(await Service.findById(req.user));
    } catch (e: any) {
      return res.status(400).json({
        err: 'Service could not be updated',
        msg: e,
      });
    }
  }
);

router.delete(
  '/services',
  isLoggedIn,
  async (req: express.Request, res: express.Response) => {
    const loggedInUser: any = req.user;
    const id = loggedInUser.id;
    try {
      await Service.findOneAndDelete({ _id: id });
      return res.json({
        msg: 'Service deleted',
      });
    } catch (e: any) {
      return res.status(400).json({
        err: 'Service could not be deleted',
      });
    }
  }
);

router.delete(
  '/:serviceId',
  isLoggedIn,
  async (req: express.Request, res: express.Response) => {
    const serviceId = req.params.serviceId;
    try {
      await Service.findOneAndDelete({ _id: serviceId });
      return res.json({
        msg: 'Service deleted',
      });
    } catch (e: any) {
      return res.status(400).json({
        err: 'Service could not be deleted',
      });
    }
  }
);
export default router;
