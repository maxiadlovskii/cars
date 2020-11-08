export interface CarFilter {
  manufacturer: string | null | string[];
  color: string | null | string[];
}

export interface Request {
  query?: any;
}
