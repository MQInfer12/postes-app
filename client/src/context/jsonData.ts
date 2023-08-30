import { create } from "zustand"
import { GeoJsonType } from "../interfaces/geojson"

interface State {
  jsonData: GeoJsonType
}

interface Functions {
  setJsonData: (jsonData: GeoJsonType) => any
}

export const useJsonData = create<State & Functions>(set => ({
  jsonData: {} as GeoJsonType,
  setJsonData: (jsonData: GeoJsonType) => set((old: any) => ({...old, jsonData }))
}))