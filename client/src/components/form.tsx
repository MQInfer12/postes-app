import { HTMLInputTypeAttribute, useState } from "react";
import data from "../data/postesJSON.json";
import "./form.css";
import { MarkerPositionType } from "../interfaces/map";
import { GeoJsonType } from "../interfaces/geojson";

interface Field {
  name: string;
  alias: string;
  type: "esriFieldTypeOID" | "esriFieldTypeInteger" | "esriFieldTypeString";
  length?: number;
}

const INPUTTYPES: Record<Field["type"], HTMLInputTypeAttribute | undefined> = {
  esriFieldTypeInteger: "number",
  esriFieldTypeString: "text",
  esriFieldTypeOID: undefined,
};

interface Props {
  coords: MarkerPositionType;
}

const Form = ({ coords }: Props) => {
  const [jsonData, setJsonData] = useState({} as GeoJsonType);

  const fields: Field[] = data.fields as Field[];

  const allTheRefs: Record<string, HTMLInputElement | null> = {};

  const handleSend = () => {
    const values: Record<string, string | number | undefined> = {};
    console.log(jsonData.features.length);
    fields.forEach((field) => {
      if (field) {
        if (!(field.type === "esriFieldTypeOID")) {
          values[field.name] = allTheRefs[field.name]?.value;
          if (field.type === "esriFieldTypeInteger") {
            values[field.name] = Number(values[field.name]);
          }
        } else {
          values[field.name] = jsonData.features.length;
        }
      }
    });
    const newValue = {
      attributes: {
        ...values,
      },
      geometry: {
        x: coords?.lat,
        y: coords?.lng,
      },
    };
    setJsonData((old: GeoJsonType) => ({
      ...old,
      features: [...old.features, newValue],
    }));
    alert("Nuevo dato añadido: " + JSON.stringify(newValue));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setJsonData(JSON.parse(content as string));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="form-container">
      <input type="file" onChange={handleFileChange} />
      {fields.map(
        (field, i) =>
          INPUTTYPES[field.type] && (
            <div className="form-inputcontainer" key={i}>
              <p>{field.name}</p>
              <input
                className="form-input"
                type={INPUTTYPES[field.type]}
                name={field.name}
                ref={(ref) => (allTheRefs[field.name] = ref)}
              />
            </div>
          )
      )}
      <button onClick={handleSend}>Añadir</button>
    </div>
  );
};

export default Form;
