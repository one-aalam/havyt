export const categorySchema = {
    $id: 'categorySchema',
    type: 'object',
    properties: {
        type: { type: 'string', minLength: 3},
        name: { type: 'string'},
        desc: { type: 'string'}
    },
    required: ['type'],
    additionalProperties: false
} as const
