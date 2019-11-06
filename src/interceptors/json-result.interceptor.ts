import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
export class JsonResultInterceptor implements InterceptorInterface {
  intercept({ response: { statusCode } }: Action, data: any) {
    return {
      ret: statusCode,
      msg: "successs",
      date: new Date().toISOString(),
      data,
    };
  }
}
