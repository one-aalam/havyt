import {  errorSchema } from '../../lib/commons/schemas'


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

export const userParamsSchema = {
    $id: 'userParamsSchema',
    type: 'object',
    properties: {
        id: { type: 'number'}
    },
    required: [ 'id' ],
    additionalProperties: false
} as const

export const getUserSchema = {
    params: userParamsSchema,
    response: {
        '2xx': userSchema,
        '4xx': errorSchema
    }
 }
