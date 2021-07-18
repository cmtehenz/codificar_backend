import { v4 as uuid } from 'uuid';

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findById(id: string): Promise<Post | undefined> {
    const findPost = this.posts.find(post => post.id === id);

    return findPost;
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, { id: uuid() }, postData);

    this.posts.push(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    const findIndex = this.posts.findIndex(findPost => findPost.id === post.id);

    this.posts[findIndex] = post;

    return post;
  }
}

export default FakePostsRepository;
