import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

import Post from '../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  findById(id: string): Promise<Post | undefined>;
  create(content: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
}
