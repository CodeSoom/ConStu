export const saveItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadItem = (key) => {
  const user = localStorage.getItem(key);

  return JSON.parse(user);
};

export const removeItem = (key) => localStorage.removeItem(key);
