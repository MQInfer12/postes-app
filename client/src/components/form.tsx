import { HTMLInputTypeAttribute } from 'react';
import data from '../data/postesJSON.json';

interface Field {
  name: string
  alias: string
  type: "esriFieldTypeOID" | "esriFieldTypeInteger" | "esriFieldTypeString"
  length?: number
}

const INPUTTYPES: Record<Field["type"], "number" | HTMLInputTypeAttribute | undefined> = {
  esriFieldTypeInteger: "number",
  esriFieldTypeString: "text",
  esriFieldTypeOID: undefined
}

const Form = () => {
  const fields: Field[] = data.fields as Field[];

  return (
    <div>
      {fields.map((field, i) => (
        INPUTTYPES[field.type] &&
        <div key={i}>
          <p>{field.name}</p>
          <input 
            type={INPUTTYPES[field.type]} 
          />
        </div>
      ))}
      <button>Añadir</button>
    </div>
  )
}

export default Form