import { getRepository, Repository } from 'typeorm';

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(id);
    return post;
  }

  public async create(content: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(content);
    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }
}

export default PostsRepository;
