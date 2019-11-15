const schema = {
  title: 'Vehicle Make',
  type: 'object',
  properties: {
    vehicleMakeName: { type: 'string' },
    lastName: { type: 'string' },
    pictureUrl: {
      type: 'string',
      uniforms: {
        component: ImageField
      }
    }
  },
  required: ['firstName', 'lastName']
};