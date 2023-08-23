export interface GeoJsonType {
  displayFieldName: string;
  fieldAliases: FieldAliases;
  geometryType: string;
  spatialReference: SpatialReference;
  fields: Field[];
  features: Feature[];
}

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

export interface Attributes {
  FID: number;
  Id: number;
  Nombre: string;
  Descripcio: string;
}

export interface Geometry {
  x: number;
  y: number;
}
