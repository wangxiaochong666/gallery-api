import { IsNotEmpty, Allow } from "class-validator";

export class DirectParams {
  @IsNotEmpty()
  accessKey: string;

  @IsNotEmpty()
  secretKey: string;
}

export class StsParams {
  @IsNotEmpty()
  accessKey: string;

  @IsNotEmpty()
  secretKey: string;

  @IsNotEmpty()
  accountID: string;

  @IsNotEmpty()
  roleName: string;

  @Allow()
  endpoint: string;

  @Allow()
  durationSeconds: string;

  @Allow()
  roleSessionName: string;

  @Allow()
  action: string;

  @Allow()
  apiVersion: string;

  @Allow()
  region: string;
}
