import transportService from '../services/transport'
import { Request } from '../interfaces/api'
import { CAR_SERVICE_URL, COLORS_SERVICE_URL, MANUFACTURES_SERVICE_URL, API_URL } from '../constants/api'

export const getCarsData = (data: Request) => transportService
    .get(`${API_URL}${CAR_SERVICE_URL}`, { params: data.query })

export const getColors = () => transportService.get(`${API_URL}${COLORS_SERVICE_URL}`)

export const getManufactures = () => transportService.get(`${API_URL}${MANUFACTURES_SERVICE_URL}`)