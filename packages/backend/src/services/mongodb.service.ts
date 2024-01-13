import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { Post } from "../models";
import { Result } from "../interfaces";

dotenv.config();

const collections: {
  posts?: Collection;
} = {};

const client: MongoClient = new MongoClient(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME as string}:${
    process.env.MONGO_INITDB_ROOT_PASSWORD as string
  }@mongo:27017`
);

const db: Db = client.db("mern-blog");

const postsCollection: Collection = db.collection("posts");

collections.posts = postsCollection;

const pushToDb = async (post: Post) => {
  try {
    await client.connect();
    await collections.posts?.insertOne(post);
    return {
      success: true,
      error: null,
      data: null,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
      data: null,
    };
  }
};

const getFromDb = async (id?: ObjectId) => {
  try {
    const query: { _id?: ObjectId } = {};
    if (id) {
      query._id = new ObjectId(id);
    }
    await client.connect();
    const resp = (await collections.posts?.find(query).toArray()) as unknown as Post[];
    return {
      success: true,
      error: {
        code: 200,
        message: null,
      },
      data: resp,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
      data: null,
    };
  }
};

const deleteFromDb = async (id: ObjectId) => {
  try {
    await client.connect();
    const resp = await collections.posts?.deleteOne({
      _id: new ObjectId(id),
    });
    if ((resp?.deletedCount as number) > 0) {
      return {
        success: true,
        error: {
          code: 200,
          message: null,
        },
        data: resp?.deletedCount,
      };
    }
    return {
      success: false,
      error: {
        code: 404,
        message: "Post doesn't exist.",
      },
      data: resp,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        code: 500,
        message: (err as Error).message,
      },
      data: null,
    };
  }
};

export default {
  pushToDb,
  getFromDb,
  deleteFromDb,
};
