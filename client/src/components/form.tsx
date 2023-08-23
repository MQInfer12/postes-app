import { HTMLInputTypeAttribute, useState } from 'react';
import data from '../data/postesJSON.json';
import './form.css';
import { MarkerPositionType } from '../interfaces/map';

interface Field {
  name: string
  alias: string
  type: "esriFieldTypeOID" | "esriFieldTypeInteger" | "esriFieldTypeString"
  length?: number
}

interface InputProps {
  type: HTMLInputTypeAttribute | undefined
  initialState?: 0 | ""
}

const INPUTTYPES: Record<Field["type"], HTMLInputTypeAttribute | undefined> = {
  esriFieldTypeInteger: "number",
  esriFieldTypeString: "text",
  esriFieldTypeOID: undefined
}

interface Props {
  coords: MarkerPositionType
}

const Form = ({ coords }: Props) => {
  const fields: Field[] = data.fields as Field[];

  const allTheRefs: Record<string, HTMLInputElement | null> = {}

  const handleSend = () => {
    let values: Record<string, string | number | undefined> = {};
    for (const [key, value] of Object.entries(allTheRefs)) {
      const field = fields.find(field => field.name === key);
      if(field?.type) {
        values[key] = value?.value;
        if(field?.type === "esriFieldTypeInteger") {
          values[key] = Number(values[key]);
        }
      }
    }
    const newValue = {
      attributes: {
        ...values
      },
      geometry: {
        x: coords?.lat,
        y: coords?.lng
      }
    }
    console.log(newValue);
  }

  const [fileContent, setFileContent] = useState({});
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file){
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result;
        setFileContent(JSON.parse(content as string));
        console.log(JSON.parse(content as string))
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='form-container'>
      <button>Añadir</button>
      <input type="file" onChange={handleFileChange} />
      {fields.map((field, i) => (
        INPUTTYPES[field.type] &&
        <div className='form-inputcontainer' key={i}>
          <p>{field.name}</p>
          <input 
            className='form-input'
            type={INPUTTYPES[field.type]} 
            name={field.name}
            ref={ref => allTheRefs[field.name] = ref}
          />
        </div>
      ))}
      <button onClick={handleSend}>Añadir</button>
    </div>
  )
}

export default Form