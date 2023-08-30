export interface FieldAliases {
  FID: string;
  Id: string;
  Nombre: string;
  Descripcio: string;
}

export interface SpatialReference {
  wkid: number;
  latestWkid: number;
}

export interface FieldType {
  name: string;
  type: string;
  alias: string;
  length?: number;
}

export interface FeatureType {
  attributes: Attributes;
  geometry: Geometry;
}

export interface Geometry {
  x: number;
  y: number;
}

export interface Field {
  name: string;
  alias: string;
  type: "esriFieldTypeOID" | "esriFieldTypeInteger" | "esriFieldTypeString";
  length?: number;
}

export type Attributes = Record<string, number | string | undefined>

export interface Feature {
  attributes: Attributes,
  geometry: {
    x: number,
    y: number
  }
}

export interface GeoJsonType {
  displayFieldName: string;
  fieldAliases: FieldAliases;
  geometryType: string;
  spatialReference: SpatialReference;
  fields: Field[];
  features: Feature[];
}