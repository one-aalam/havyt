export const authSchema = {
    $id: 'authSchema',
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email'},
        password: { type: 'string'},
    },
    required: ['email', 'password'],
    additionalProperties: false
} as const
