import { IsUUID, IsString, IsBoolean, IsOptional } from 'class-validator';
import { User } from '../user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO implements Readonly<UserDTO> {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  public static from(dto: Partial<UserDTO>) {
    const it = new UserDTO();
    it.id = dto.id;
    it.firstName = dto.firstName;
    it.lastName = dto.lastName;
    it.isActive = dto.isActive;
    return it;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      isActive: entity.isActive,
    });
  }

  public toEntity() {
    const it = new User();
    it.id = this.id;
    it.firstName = this.firstName;
    it.lastName = this.lastName;
    it.isActive = this.isActive;
    return it;
  }
}
