import { HTMLInputTypeAttribute } from 'react';
import data from '../data/postesJSON.json';
import './form.css';
import { MarkerPositionType } from '../interfaces/map';

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

interface Props {
  coords: MarkerPositionType
}

const Form = ({ coords }: Props) => {
  const fields: Field[] = data.fields as Field[];

  console.log(coords);
  return (
    <div className='form-container'>
      {fields.map((field, i) => (
        INPUTTYPES[field.type] &&
        <div className='form-inputcontainer' key={i}>
          <p>{field.name}</p>
          <input 
            className='form-input'
            type={INPUTTYPES[field.type]} 
          />
        </div>
      ))}
      <button>Añadir</button>
    </div>
  )
}

export default Form