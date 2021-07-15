export const categorySchema = {
    $id: 'categorySchema',
    type: 'object',
    properties: {
        type: { type: 'string', minLength: 3},
        name: { type: 'string'},
        desc: { type: 'string'}
    },
    additionalProperties: false
} as const
