import { NextFunction, Request, Response } from "express";
import DateExtension from "@joi/date";
import JoiImport from "joi";

const joiImport = JoiImport.extend(DateExtension) as typeof JoiImport;

const schemes = {
  params: joiImport.object({
    id: joiImport.string().length(24).required(),
  }),
  body: joiImport.object({
    title: JoiImport.string().required().max(50),
    content: JoiImport.array().required(),
    author: JoiImport.object({
      name: JoiImport.string().required(),
      mail: JoiImport.string().email().required(),
    }).required(),
    created_on: JoiImport.date().required(),
    updated_on: JoiImport.date().required(),
  }),
};

const joi = (req: Request, res: Response, next: NextFunction) => {
  switch (req.method) {
    case "GET":
    case "DELETE":
      var { error } = schemes.params.validate(req.params);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      break;
    case "PUT":
    case "POST":
      var { error } = schemes.body.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      break;
  }
  next();
};

export default joi;
