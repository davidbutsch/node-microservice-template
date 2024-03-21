import {
  IsDefined,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  User,
  UserFlags,
  UserMetadata,
  UserModel,
  UserPreferences,
  UserProfile,
} from "@/modules/user";

import { Type } from "class-transformer";

export class UserDTO implements Omit<User, "_id" | "security"> {
  @IsString() id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserProfile)
  profile: UserProfile;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserPreferences)
  preferences: UserPreferences;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserFlags)
  flags: UserFlags;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserMetadata)
  metadata: UserMetadata;

  static toDTO(domain: User): UserDTO {
    if (domain instanceof UserModel) domain = domain.toObject();

    const userDTO: UserDTO = {
      id: domain._id.toString(),
      profile: domain.profile,
      preferences: domain.preferences,
      flags: domain.flags,
      metadata: domain.metadata,
    };

    return userDTO;
  }
}
