export function flattenTranslations(obj: Record<string, any>, prefix = ''): Record<string, string> {
    const result: Record<string, string> = {};
  
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
  
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenTranslations(value, newKey));
      } else {
        result[newKey] = String(value);
      }
    }
  
    return result;
  }
  