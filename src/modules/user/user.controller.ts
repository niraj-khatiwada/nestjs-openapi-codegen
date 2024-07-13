import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { GenericErrorDto } from './dto/error.dto';
import { UserDto, UserQueryDto } from './dto/user.dto';
import { Serialize } from '@interceptors/serialize';
import { SilentQuery } from 'src/decorators/silent-query';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: GenericErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserDto,
  })
  @ApiQuery({
    style: 'deepObject',
    type: UserQueryDto,
  })
  @Serialize(UserDto)
  me(@SilentQuery() query: UserQueryDto) {
    return this.userService.findOne('me', query);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: GenericErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserDto,
  })
  @ApiQuery({
    style: 'deepObject',
    type: UserQueryDto,
  })
  @Serialize(UserDto)
  async findOne(@Param('id') id: string, @SilentQuery() query: UserQueryDto) {
    return this.userService.findOne(id, query);
  }
}
