export const slugGenerate = (name) => {
  return name
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const passwordGenerate = (size) => Math.random().toString(36).slice(-(size || 8)).toUpperCase()
