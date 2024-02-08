// eslint-disable-next-line no-undef
db.createUser({
  user: 'trangdem99',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'grpc',
    },
  ],
})
