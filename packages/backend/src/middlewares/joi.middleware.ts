import { NextFunction, Request, Response } from "express";
import DateExtension from "@joi/date";
import JoiImport from "joi";

const joiImport = JoiImport.extend(DateExtension) as typeof JoiImport;

const schemes = {
  getById: joiImport.object({
    id: joiImport.string().length(24).required(),
  }),
  deleteById: joiImport.object({
    id: joiImport.string().length(24).required(),
  }),
  postBody: joiImport.object({
    title: JoiImport.string().required().max(50),
    content: JoiImport.array().required(),
    author: JoiImport.object({
      name: JoiImport.string().required(),
      mail: JoiImport.string().email().required(),
    }).required(),
  }),
  updateBody: joiImport.object({
    title: JoiImport.string().max(50),
    content: JoiImport.array(),
    author: JoiImport.object({
      name: JoiImport.string(),
      mail: JoiImport.string().email(),
    }),
  }),
  updateParams: JoiImport.object({
    id: joiImport.string().length(24).required(),
  }),
};

const joi = (req: Request, res: Response, next: NextFunction) => {
  switch (req.method) {
    case "GET":
      var { error } = schemes.getById.validate(req.params);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      } else {
        next();
      }
      break;
    case "DELETE":
      var { error } = schemes.deleteById.validate(req.params);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      } else {
        next();
      }
      break;
    case "PUT":
      var { error } = schemes.updateBody.validate(req.body);
      var { error } = schemes.updateParams.validate(req.params);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      } else {
        next();
      }
      break;
    case "POST":
      var { error } = schemes.postBody.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      } else {
        next();
      }
      break;
  }
};

export default joi;
