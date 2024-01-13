import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { Post } from "../models";
import moment from "moment";

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

const postToDb = async (post: Post) => {
  try {
    await client.connect();
    await collections.posts?.insertOne({
      title: post.title,
      content: post.content,
      author: post.author,
      created_on: moment(new Date(Date.now()), ["DD-MM-YYYY", "DD-MM-YY"]).format(),
      updated_on: moment(new Date(Date.now()), ["DD-MM-YYYY", "DD-MM-YY"]).format(),
    });
    return {
      success: true,
      error: {
        message: null,
        code: 200,
      },
      data: null,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: (err as Error).message,
        code: 500,
      },
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
        message: null,
        code: 200,
      },
      data: resp,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: (err as Error).message,
        code: 500,
      },
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
          message: null,
          code: 200,
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

const updateFromDb = async (id: ObjectId, post: Post) => {
  try {
    const oldPost = (await getFromDb(id)).data as unknown as Post[];
    if (oldPost.length == 0) {
      return {
        success: false,
        error: {
          message: "Post doesn't exist.",
          code: 404,
        },
      };
    }
    const resp = await collections.posts?.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: post.title || oldPost[0].title,
          content: post.content || oldPost[0].content,
          author: post.author || oldPost[0].author,
          updated_on: moment(Date.now()).format(),
        },
      }
    );
    return {
      success: true,
      error: {
        message: null,
        code: 200,
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
  postToDb,
  getFromDb,
  deleteFromDb,
  updateFromDb,
};
