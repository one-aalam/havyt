
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

export function getPropsForTemplate(schema: any, val: any) {
    let props = []
    for (const prop in schema.properties) {
        props.push(
            {
                key: prop,
                ...schema.properties[prop],
                value: val[prop],
                fieldType: schema.properties[prop].type === 'number' ? 'number' :
                            schema.properties[prop].type === 'array' ? 'textarea' :
                            'text',
                required: schema.required.includes(prop),
                label: toCapitalizedWords(prop)
            }
        )
    }
    return props
}
