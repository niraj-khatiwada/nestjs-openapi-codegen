import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';

export class ProfileDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  age: number;
}

export class UserDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastLame: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiPropertyOptional({ type: ProfileDto })
  @Type(() => ProfileDto)
  profile?: ProfileDto;

  @Expose()
  @ApiProperty()
  sqlQuery: string;
}

export class UserRelationsDto {
  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return String(obj?.[key]) === 'true';
  })
  @IsOptional()
  profile?: boolean;
}

export class UserQueryDto {
  @Expose()
  @ApiPropertyOptional({ type: UserRelationsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserRelationsDto)
  relations?: UserRelationsDto;
}
