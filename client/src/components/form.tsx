import { HTMLInputTypeAttribute } from 'react';
import data from '../data/postesJSON.json';
import './form.css';
import React, {useState} from 'react';




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
      <input type="file" onChange={handleFileChange} />
      <div>
        <h2>File Content:</h2>
        
      </div>
    </div>
  )
}

export default Form