import { Service } from "typedi";
import FormData from "form-data";
import fetch, { Response } from "node-fetch";
import { parse } from "path";
import sharp from "sharp";

import { MD5 } from "../utilities/crypto/MD5";
import { BadRequestError } from "routing-controllers";

export interface Params {
  name: string;
  buffer: Buffer;
  size?: number;
  type?: string;
}

@Service()
export class UploadService {
  static async request(url: string, body: FormData, params = {}) {
    const result = await fetch(url, {
      method: "POST",
      body,
      ...params,
    });

    return result;
  }

  static formData(buffer: Buffer, name: string, params = {}) {
    const formData: FormData = new FormData();
    formData.append("file", buffer, { filename: name });

    for (const i in params) {
      const value = params[i];
      formData.append(i, value);
    }

    return formData;
  }

  async aliexpress({ originalname, buffer }: Express.Multer.File) {
    // 构造 FormData
    const formData = UploadService.formData(buffer, originalname, {
      scene: "aeMessageCenterV2ImageRule",
      name: originalname,
    });

    // 上传文件
    const { code, url, fs_url, hash, width, height, size } = await UploadService.request(
      "https://kfupload.alibaba.com/mupload",
      formData
    ).then((r: Response) => r.json());

    // 上传错误
    if (Number(code) !== 0) throw new BadRequestError("Upload Error");

    return {
      url,
      width,
      height,
      size,
      hash,
      name: fs_url,
      originalName: originalname,
    };
  }

  async jingdong({ originalname, buffer }: Express.Multer.File) {
    // 取数据
    const { width, height, size }: sharp.Metadata = await sharp(buffer).metadata();

    // 构造 FormData
    const formData = UploadService.formData(buffer, originalname);

    // 上传文件
    const filePath = await UploadService.request(
      "https://search.jd.com/image?op=upload",
      formData,
      {
        Referer: "https://www.jd.com",
        Origin: "https://www.jd.com",
        "Upgrade-insecure-requests": "1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      }
    )
      .then((response: Response) => response.text())
      .then((r: string) => /callback\("(.*)"\)/.exec(r))
      .then(([, url]) => url);

    if (!/^jfs/.test(filePath)) {
      throw new BadRequestError(filePath);
    }

    // 拼接链接
    const url = `https://img10.360buyimg.com/img/${filePath}`;

    // 获取文件名
    const { base } = parse(filePath);

    // Hash
    const hash = MD5(buffer);

    return {
      url,
      width,
      height,
      size,
      originalName: originalname,
      name: base,
      hash,
    };
  }

  async netease({ originalname, buffer }: Express.Multer.File) {
    // 取数据
    const { width, height, size }: sharp.Metadata = await sharp(buffer).metadata();

    // 构造 FormData
    const formData = UploadService.formData(buffer, originalname, {
      format: "json",
    });

    // 上传文件
    const { code, data } = await UploadService.request(
      "http://you.163.com/xhr/file/upload.json",
      formData,
      {
        headers: {
          Referer: "http://you.163.com",
          Origin: "http://you.163.com",
        },
      }
    ).then((r: Response) => r.json());

    // 上传错误
    if (Number(code) !== 200) throw new BadRequestError("Upload Error");

    // 处理链接
    const [http_url] = data;
    const url = http_url.replace("http://", "https://");

    // 获取文件名
    const { base } = parse(url);

    // Hash
    const hash = MD5(buffer);

    return {
      url,
      width,
      height,
      size,
      hash,
      name: base,
      originalName: originalname,
    };
  }

  async suning({ originalname, buffer }: Express.Multer.File) {
    // 取数据
    const { width, height, size }: sharp.Metadata = await sharp(buffer).metadata();

    // 构造 FormData
    const formData = new FormData();
    formData.append("Filedata", buffer, { filename: originalname });
    formData.append("omsOrderItemId", 1);
    formData.append("custNum", 1);
    formData.append("deviceType", 1);

    // 上传文件
    const { errorcode, src, errMsg } = await UploadService.request(
      "http://review.suning.com/imageload/uploadImg.do",
      formData,
      {
        headers: {
          Referer: "http://review.suning.com/my_cmmdty_review.do",
        },
      }
    ).then((r: Response) => r.json());

    // 上传错误
    if (Number(errorcode) !== 1) throw new BadRequestError(errMsg);

    // 处理链接
    const url = `https:${src}.jpg`;

    // 获取文件名
    const { base } = parse(url);

    // Hash
    const hash = MD5(buffer);

    return {
      url,
      width,
      height,
      size,
      hash,
      name: base,
      originalName: originalname,
    };
  }

  async toutiao({ originalname, buffer, size }: Express.Multer.File) {
    // 构造 FormData
    const formData = new FormData();
    formData.append("photo", buffer, { filename: originalname });

    // 上传文件
    const { web_url, web_uri, message, width, height } = await UploadService.request(
      "https://mp.toutiao.com/upload_photo/?type=json",
      formData,
      {
        headers: {
          Origin: "https://mp.toutiao.com",
          Referer: "https://mp.toutiao.com/profile_register_v3/register/register-normal/2",
        },
      }
    ).then((r: Response) => r.json());

    // 上传错误
    if (message !== "success") throw new BadRequestError("Upload Error");

    // Hash
    const hash = MD5(buffer);

    return {
      url: web_url,
      width,
      height,
      size,
      hash,
      name: web_uri,
      originalName: originalname,
    };
  }

  async baijiahao({ originalname, buffer, mimetype }: Express.Multer.File) {
    // 取数据
    const { width, height, size }: sharp.Metadata = await sharp(buffer).metadata();

    // 构造 FormData
    const formData = new FormData();
    formData.append("media", buffer, { filename: originalname });
    formData.append("no_compress", "1");
    formData.append("id", "WU_FILE_0");
    formData.append("is_avatar", "0");
    formData.append("type", mimetype);
    formData.append("name", originalname);

    // 上传文件
    const {
      errno,
      ret: { https_url },
    } = await UploadService.request(
      "https://baijiahao.baidu.com/builderinner/api/content/file/upload",
      formData,
      {
        headers: {
          Origin: "https://baijiahao.baidu.com",
          Referer: "https://baijiahao.baidu.com/builder/app/register?type=individual",
        },
      }
    ).then((r: Response) => r.json());

    // 上传错误
    if (errno !== 0) throw new BadRequestError("Upload Error");

    // 获取文件名
    const { base } = parse(https_url);

    // Hash
    const hash = MD5(buffer);

    return {
      url: https_url,
      width,
      height,
      size,
      hash,
      name: base,
      originalName: originalname,
    };
  }

  async graph({ originalname, buffer }: Express.Multer.File) {
    // 取数据
    const { width, height, size }: sharp.Metadata = await sharp(buffer).metadata();

    // 构造 FormData
    const formData = new FormData();
    formData.append("image", buffer, { filename: originalname });
    formData.append("tn", "pc");
    formData.append("from", "pc");
    formData.append("image_source", "PC_UPLOAD_FILE");

    // 上传文件
    const result = await UploadService.request("https://graph.baidu.com/upload", formData).then(
      (r: Response) => r.json()
    );

    const {
      status,
      data: { sign },
    } = result;

    // 上传错误
    if (status !== 0) throw new BadRequestError("Upload Error");

    // 获取文件名
    const filename = `${sign}${parse(originalname).ext}`;

    // 拼接链接
    const url = `https://graph.baidu.com/resource/${filename}`;

    // Hash
    const hash = MD5(buffer);

    return {
      url,
      originalName: originalname,
      name: filename,
      width,
      height,
      size,
      hash,
    };
  }

  async haoso({ originalname, buffer }: Express.Multer.File) {
    // 取数据
    const { width, height, size }: sharp.Metadata = await sharp(buffer).metadata();

    // 构造 FormData
    const formData = new FormData();
    formData.append("upload", buffer, { filename: originalname });
    formData.append("submittype", "upload");
    formData.append("src", "st");
    formData.append("srcsp", "st_search");
    formData.append("srcsp", "st_search");

    // 上传文件
    const data = await UploadService.request("http://st.so.com/stu", formData, {
      headers: {
        Origin: "http://st.so.com",
        Referer: "http://st.so.com/",
        "Upgrade-Insecure-Requests": 1,
      },
    }).then(r => new URL(r.url).searchParams.get("imgkey"));

    // 获取文件名
    const filename = `${parse(data).name}${parse(originalname).ext}`;

    // 拼接链接
    const url = `https://ps.ssl.qhmsg.com/${data}`;

    // Hash
    const hash = MD5(buffer);

    return {
      url,
      originalName: originalname,
      name: filename,
      width,
      height,
      size,
      hash,
    };
  }
}
