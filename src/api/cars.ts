import { AxiosResponse } from "axios";
import transportService from "../services/transport";
import { Request } from "../interfaces/api";
import {
  CAR_SERVICE_URL,
  COLORS_SERVICE_URL,
  MANUFACTURES_SERVICE_URL,
  API_URL,
} from "../constants/api";

export const getCarsData = (
  data: Request | undefined
): Promise<AxiosResponse> =>
  transportService.get(`${API_URL}${CAR_SERVICE_URL}`, {
    params: data && data.query,
  });

export const getColors = (): Promise<AxiosResponse> =>
  transportService.get(`${API_URL}${COLORS_SERVICE_URL}`);

export const getManufactures = (): Promise<AxiosResponse> =>
  transportService.get(`${API_URL}${MANUFACTURES_SERVICE_URL}`);
