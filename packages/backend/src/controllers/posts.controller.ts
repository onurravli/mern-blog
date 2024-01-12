import { Request, Response } from "express";
import { Post } from "../models";

class PostsController {
  constructor() {}
  public async get(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
      return res.status(200).json({
        message: "GET /posts/:id",
        id: id,
      });
    }
    return res.status(200).json({
      message: "GET /posts",
    });
  }
  public async post(req: Request, res: Response) {
    const post: Post = req.body;
    return res.status(200).json({
      message: "POST /posts",
      post: post,
    });
  }
  public async put(req: Request, res: Response) {
    const post: Post = req.body;
    return res.status(200).json({
      message: "PUT /posts/:id",
      post: post,
    });
  }
  public async delete(req: Request, res: Response) {
    return res.status(200).json({
      message: "DELETE /posts/:id",
    });
  }
}

export default PostsController;
