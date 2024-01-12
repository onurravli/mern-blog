class Post {
  constructor(
    public id: number,
    public title: string,
    public content: string[],
    public author: {
      name: string;
      mail: string;
    },
    public created_on: Date,
    public updated_on: Date
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.created_on = created_on;
    this.updated_on = updated_on;
  }
}

export default Post;
