export const publicAsset = (assetPath: string) => {
  const normalizedPath = assetPath.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${normalizedPath}`
}
