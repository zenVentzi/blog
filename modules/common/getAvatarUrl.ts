import * as gravatar from 'gravatar';

const getAvatarUrl = (gravatarEmail: string) => {
  const avatarUrl = gravatar.url(gravatarEmail, {
    s: '200',
    r: 'pg',
    d: '404',
  });

  return avatarUrl;
};

export default getAvatarUrl;
