export const userSchema = {
    $id: 'userSchema',
    type: 'object',
    properties: {
        id: { type: 'number'},
        firstName: { type: 'string'},
        lastName: { type: 'string'},
        email: { type: 'string'},
        avatar: { type: 'string'}
    },
    required: [ 'id', 'firstName', 'email' ],
    additionalProperties: false
} as const
