export default {
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'userMessage',
      title: 'Message',
      type: 'string',
    },
    {
      name: 'userVerify',
      title: 'Verify',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'userAddress',
      title: 'Wallet Address',
      type: 'string',
    },
    {
      name: 'userAvatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'userContacts',
      title: 'Contacts',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
