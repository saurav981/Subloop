export const getInitials = (fullname) => {
  return fullname
    .trim()
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export const generateRandomString = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
