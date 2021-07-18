import { injectable, inject } from 'tsyringe';

import Post from '@modules/posts/infra/typeorm/entities/Post';

import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  content: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ content }: IRequest): Promise<Post> {
    const post = await this.postsRepository.create({
      content,
    });

    return post;
  }
}

export default CreatePostService;
