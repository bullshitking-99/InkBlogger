/**
 * 在构建阶段转化动态路径，使资源能正确解析，避免404问题
 * @param relativePath 该资源在引用文件的相对路径
 */
export function transformSrcPath(relativePath: string) {
  // shit,导出去之后使用相对路径没用啊
  return new URL(relativePath, import.meta.url).href;
}
