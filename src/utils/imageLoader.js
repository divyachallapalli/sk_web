/**
 * Resolves image path to include base URL when needed
 * @param {string} imagePath - The image path (can be relative or absolute)
 * @returns {string} - The resolved image path
 */
export function getImageUrl(imagePath) {
  // If it's already an absolute URL (starts with http), return as is
  if (imagePath?.startsWith('http')) {
    return imagePath
  }
  
  // For relative paths, prepend the base URL
  const baseUrl = import.meta.env.BASE_URL
  const cleanPath = imagePath?.startsWith('/') ? imagePath.slice(1) : imagePath
  
  return `${baseUrl}${cleanPath}`
}

export function getBaseUrl(){
    return import.meta.env.BASE_URL;
}
