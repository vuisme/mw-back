import { Entity, Index, PrimaryKey, Property, types } from '@mikro-orm/core';
import { nanoid } from 'nanoid';

export type UserProfile = {
  colorA: string;
  colorB: string;
  icon: string;
};

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ name: 'id', type: 'text' })
  id: string = nanoid(12);

  @Property({ name: 'public_key', type: 'text' })
  @Index()
  publicKey!: string;

  @Property({ name: 'namespace' })
  namespace!: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ name: 'permissions', type: types.array })
  roles: string[] = [];

  @Property({
    name: 'profile',
    type: types.json,
  })
  profile!: UserProfile;
}

export interface UserDTO {
  id: string;
  namespace: string;
  publicKey: string;
  roles: string[];
  createdAt: string;
  profile: {
    colorA: string;
    colorB: string;
    icon: string;
  };
}

export function formatUser(user: User): UserDTO {
  return {
    id: user.id,
    namespace: user.namespace,
    publicKey: user.publicKey,
    roles: user.roles,
    createdAt: user.createdAt.toISOString(),
    profile: {
      colorA: user.profile.colorA,
      colorB: user.profile.colorB,
      icon: user.profile.icon,
    },
  };
}
