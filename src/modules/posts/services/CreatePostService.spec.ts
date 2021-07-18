import FakePostsRepository from '../repositories/fakes/FakePostsRepositories';
import CreatePostService from './CreatePostService';

let fakePostsRepository: FakePostsRepository;
let createPost: CreatePostService;

describe('CreatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();

    createPost = new CreatePostService(fakePostsRepository);
  });

  it('should be able to create a new post', async () => {
    const post = await createPost.execute({
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris magna augue, gravida a faucibus sed.',
    });

    expect(post).toHaveProperty('id');
  });
});
