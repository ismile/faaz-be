import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { QueryBuilder } from 'typeorm-server-query-builder';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async paginate(query) {
    if (!query.page) query.page = 0;
    if (!query.size) query.limit = 10;
    const builder = new QueryBuilder(query);
    const q = builder.build();

    const [items, total] = await this.repository.findAndCount(q);
    return {
      page: query.page,
      limit: query.limit,
      total,
      items,
    };
  }

  async findOne(id: string): Promise<UserDTO> {
    const entity = await this.repository.findOne(id);
    return UserDTO.fromEntity(entity);
  }

  async create(dto: UserDTO): Promise<UserDTO> {
    const entity = await this.repository.save(dto.toEntity());
    return UserDTO.fromEntity(entity);
  }

  async update(id: string, dto: UserDTO): Promise<UserDTO> {
    const prevEntity = await this.repository.findOne(id);
    const updatedDto = {
      ...prevEntity,
      ...dto.toEntity,
      id: id,
    };
    const entity = await this.repository.save(updatedDto);
    return UserDTO.fromEntity(entity);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
