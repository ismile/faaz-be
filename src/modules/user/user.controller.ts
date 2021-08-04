import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAll(
    //  @Query('page', ParseIntPipe) page: number = 1,
    //  @Query('limit', ParseIntPipe) limit: number = 10,
    @Query() query,
  ): Promise<any> {
    return this.service.paginate(query);
  }

  @Post()
  public async post(@Body() dto: UserDTO): Promise<UserDTO> {
    return this.service.create(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UserDTO) {
    return this.service.update(id, dto);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserDTO> {
    return await this.service.findOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
