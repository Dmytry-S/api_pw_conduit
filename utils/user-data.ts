const symbols = 'wretrytSFDGFHGJrytuFGHJhgjfhgjhgfhgjfghgjhERTYUkfgjhTfghgjdgfhgjxchgjfgfhgcvcv';

export function generateUserEmail() {
  return `user${Math.floor(Math.random() * 10000 * symbols.length)}@gm.co`;
}

export function generateUserName() {
  return `testUser${Math.floor(Math.random() * 10000 * symbols.length)}`;
}

export const userPassword = '12345';
export const updatedBio = 'Short bio';
