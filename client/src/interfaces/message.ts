export interface Message {
  type: "coords"
  data: {
    latitude: number
    longitude: number
  }
}