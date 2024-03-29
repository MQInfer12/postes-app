import { HTMLInputTypeAttribute, useState } from "react";
import data from "../data/postesJSON.json";
import "./form.css";
import { MarkerPositionType } from "../interfaces/map";
import { Attributes, Feature, Field, GeoJsonType } from "../interfaces/geojson";
import Button from "./button";


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
    const values: Attributes = {};
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
    const newValue: Feature = {
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

  return (
    <div className="form-container">
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
      <Button onClick={handleSend}>Añadir</Button>
    </div>
  );
};

export default Form;
