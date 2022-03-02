export interface EarthquakeResponse {
  type: string;
  metadata: MetaData;
  features: EarthquakeData[];
  bbox: number[];
}

export interface EarthquakeGeometry {
  type: string;
  coordinates: number[];
}
export interface MetaData {
  generated: number;
  url: string;
  title: string;
  api: string;
  count: number;
  status: number;
}

export interface EarthquakeData {
  type: string;
  properties: EarthquakeProperties;
  id: string;
  geometry: EarthquakeGeometry;
}

export interface EarthquakeProperties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: number;
  url: string;
  detail: string;
  felt: number;
  cdi: number;
  mmi: number;
  alert: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: string;
  title: string;
}
