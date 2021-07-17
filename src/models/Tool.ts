import { Entity } from 'typeorm';

@Entity('tools')
class Tool {
  title: string;

  link: string;

  description: string;

  tags: string;
}
