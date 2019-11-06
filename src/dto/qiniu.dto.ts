import { IsNotEmpty, Allow } from "class-validator";

export class DirectParams {
  @IsNotEmpty()
  accessKey: string;

  @IsNotEmpty()
  secretKey: string;

  @IsNotEmpty()
  bucket: string;

  @Allow()
  cdn: string;
}
