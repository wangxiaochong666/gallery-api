import { Inject, Service } from "typedi";
import { Controller, Post, UploadedFile, Param, BadRequestError } from "routing-controllers";
import { UploadService } from "../services/upload.service";

@Service()
@Controller("/v1/upload")
export class UploadsController {
  @Inject()
  private uploadService: UploadService;

  @Post("/:id")
  async upload(@Param("id") serviceName: string, @UploadedFile("file") file: Express.Multer.File) {
    // 获取服务
    const service = this.uploadService[serviceName];

    // 服务不存在
    if (!service) throw new BadRequestError("Parameter Error");

    // 缺少参数
    if (!file) throw new BadRequestError("Missing Parameter");

    // 返回数据
    const result = await service(file);

    // 发送结果
    return result;
  }
}
