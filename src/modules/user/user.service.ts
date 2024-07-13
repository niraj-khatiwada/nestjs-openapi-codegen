import { Injectable } from '@nestjs/common';
import { UserQueryDto } from './dto/user.dto';

@Injectable()
export class UserService {
  async findOne(id: string, query?: UserQueryDto) {
    const profile = query?.relations?.profile;
    // SQL query
    const sqlQuery = `SELECT * FROM user ${profile ? 'INNER JOIN profile ON user.profileId = profile.id' : ''}`;
    return {
      id,
      firstName: id === 'me' ? 'Me' : 'Nest.js',
      sqlQuery,
      ...(query?.relations?.profile
        ? { profile: { id: `${id}-profile`, age: 100 } }
        : {}),
    };
  }
}
