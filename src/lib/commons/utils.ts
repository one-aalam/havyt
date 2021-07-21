
type SchemaType = {
    properties: {
        [key: string]: {
            type: 'string' | 'number' | 'array',
            minLength: number,
            minItems: number,
            items: {
                type: 'string' | 'number'
            },
            default: string | number
        }
    },
    required: string[]
}

export function toCapitalizedWords(name: string) {
    var words = name.match(/[A-Za-z][a-z]*/g) || [];

    return words.map(capitalize).join(" ");
}

export function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function getPropsForTemplate(schema: any, val: any, options: any) {
    let props = []
    for (const prop in schema.properties) {
        const propSchema = schema.properties[prop]
        const fieldType = propSchema.type === 'number' ? 'number' : propSchema.type === 'array' ? 'textarea' : 'text'
        props.push(
            {
                key: prop,
                ...propSchema,
                value: val[prop] && propSchema.type === 'array' ? val[prop].join('\n') : val[prop] ? val[prop] : '',
                fieldType: options[prop] && Array.isArray(options[prop].values) ? 'select' : options[prop] && options[prop].renderAs ? options[prop].renderAs : fieldType,
                required: schema.required.includes(prop),
                label: toCapitalizedWords(prop),
                ...(options[prop] && options[prop].values ? { options: options[prop].values } : null),
            }
        )
    }
    return props
}
