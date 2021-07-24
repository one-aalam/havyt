import fs from 'fs'
import { MultipartFile } from 'fastify-multipart'
import uploadConfig from '../../config/upload'

/**
 * Capitalize sentences
 * @param str string to capitalize
 * @returns
 */
export function toCapitalizedWords(str: string) {
  var words = str.match(/[A-Za-z][a-z]*/g) || []

  return words.map(capitalize).join(' ')
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

/**
 * Helps with preparing all the data a server-side template might need to render the create/update interfaces in a bit non-repetitive fashion!
 *
 * @TODO: Type `em
 * @param schema
 * @param val
 * @param options
 * @returns
 */
export function getPropsForTemplate(schema: any, val: any, options: any) {
  let props = []
  for (const prop in schema.properties) {
    const propSchema = schema.properties[prop]
    const fieldType =
      propSchema.type === 'number' ? 'number' : propSchema.type === 'array' ? 'textarea' : 'text'
    props.push({
      key: prop,
      ...propSchema,
      value:
        val[prop] && propSchema.type === 'array' && val[prop].join
          ? val[prop].join('\n')
          : val[prop]
          ? val[prop]
          : '',
      fieldType:
        options[prop] && Array.isArray(options[prop].values)
          ? 'select'
          : options[prop] && options[prop].renderAs
          ? options[prop].renderAs
          : fieldType,
      required: schema.required.includes(prop),
      label: toCapitalizedWords(prop),
      ...(options[prop] && options[prop].values ? { options: options[prop].values } : null),
    })
  }
  return props
}

/**
 *
 * @param src String to split into an array
 * @returns
 */
export function toArray(src: string) {
  return src && src.indexOf('\n') !== -1 ? src.split('\n') : [src]
}

/**
 *
 * @param source Object/Dictionary that can have keys that should be represented as an array when saved
 * @param multilineStrFields The keys?
 * @returns No keys with multiline string left
 */
export const toArrayFromMultilineStrFields = (source: {[key:string]: any}, multilineStrFields: string[]) => {
    return Object.entries(source).reduce(
        // @ts-ignore
        (acc, [key, val]: [string, any]) => (val ? ((acc[key] = multilineStrFields.includes(key) && !Array.isArray(val) ? toArray(val): val), acc) : acc),
        {}
    )
}

/**
 *
 * @param source String that could be an Array in disguise
 * @returns Array, coz that's wot you need in return right?
 */
export const isStringifiedArray = (source: string) => source && source.indexOf('[') === 0 && source.indexOf(']') === source.length - 1

/**
 *
 * @param source The FormData with all the values as string
 * @returns parsed FormData, ready for persisting
 */
export const toFlatFromMultipartBody = (source: {[key:string]: any}) => {
    return Object.entries(source).reduce(
        // @ts-ignore
        (acc, [key, val]: [string, any]) => ((acc[key] = !isNaN(val.value) || isStringifiedArray(val.value) ? JSON.parse(val.value) : val.value), acc),
        {}
    )
}

export const toFlatFromMultipartBodySimple = (source: {[key:string]: any}) => {
    return Object.entries(source).reduce(
        // @ts-ignore
        (acc, [key, val]: [string, any]) => ((acc[key] = parseInt(val.value) == val.value ? parseInt(val.value) : val.value), acc),
        {}
    )
}

/**
 *
 * @param file MultipartFile to save in the upload directory
 * @returns the filename back, or an empty string
 */
export const toImageUrl = async(file: MultipartFile): Promise<string> => {
    if(file && file.filename) {
        const fileName = file.filename // generate unique name
        const fileBuffer = await file.toBuffer()
        fs.writeFileSync(`${uploadConfig.dir.replace('/', '')}/${fileName}`, fileBuffer)
        return Promise.resolve(fileName)
    }
    return Promise.resolve('')
}
