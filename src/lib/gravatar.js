import md5 from 'md5';

export const gravatarUri = (email, props) => {
  const params = new URLSearchParams({ s: 256, d: 'blank', r: 'pg', ...props});
  return `https://gravatar.com/avatar/${md5(email.toLowerCase().trim())}?${params}`;
}