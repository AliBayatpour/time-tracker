export const isNotEmpty = (value: string) => value.trim() !== "";

export const isEmail = (value: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ? true
    : false;
};

export const isPassword = (value: string): boolean => {
  return value.length > 5 ? true : false;
};

export const isNumWithLimit = (value: string): boolean => {
  return /^\d+$/.test(value) && value.trim() === value ? true : false;
};
