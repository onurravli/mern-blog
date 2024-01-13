import { Request, Response } from "express";
import { Post } from "../models";
import { mongodb } from "../services";
import { ObjectId } from "mongodb";
import { Result } from "../interfaces";

class PostsController {
  public async get(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
      const resp = await mongodb.default.getFromDb(new ObjectId(id as string));
      if (resp.success) {
        const post = resp.data as unknown as Post[];
        if (post.length != 0) {
          return res.status(200).json(post[0]);
        }
        return res.status(404).json({
          error: "Post not found.",
        });
      }
    }
    const resp = await mongodb.default.getFromDb();
    if (resp.success) {
      const posts = resp.data as unknown as Post[];
      return res.status(200).json({
        count: posts.length,
        posts: posts,
      });
    }
    return res.status(resp.error.code).json({
      error: resp.error.message,
    });
  }

  public async post(req: Request, res: Response) {
    const post: Post = req.body;
    const resp = await mongodb.default.postToDb(post);
    if (resp.success) {
      return res.status(201).json({
        message: "Post created successfully.",
      });
    }
    return res.status(500).json({
      error: "Post couldn't be created.",
      detail: resp.error,
    });
  }

  public async put(req: Request, res: Response) {
    const post: Post = req.body;
    const { id } = req.params;
    const resp = await mongodb.default.updateFromDb(new ObjectId(id), post);
    if (resp.success) {
      return res.status(200).json({
        message: "Post updated successfully.",
      });
    }
    return res.status(resp.error.code).json({
      error: resp.error.message,
    });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const resp: Result = await mongodb.default.deleteFromDb(new ObjectId(id));
    if (resp.success) {
      return res.status(200).json({
        message: "Post deleted successfully.",
      });
    }
    return res.status(resp.error?.code).json({
      error: resp.error.message,
    });
  }
}

export default PostsController;
