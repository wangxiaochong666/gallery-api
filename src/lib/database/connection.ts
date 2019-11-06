import * as TypeORM from "typeorm";

export let connection: TypeORM.Connection;

/**
 * 创建连接
 *
 * @param options 数据库配置
 * @returns
 */
export async function createConnection(
  options?: TypeORM.ConnectionOptions
): Promise<TypeORM.Connection> {
  options = options || (await TypeORM.getConnectionOptions());

  if (!connection) {
    connection = await TypeORM.createConnection(options);
  }

  return connection;
}
