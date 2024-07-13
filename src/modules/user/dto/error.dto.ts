import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GenericErrorDto {
  @Expose()
  @ApiProperty()
  statusCode: number;

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty()
  error: string;
}
