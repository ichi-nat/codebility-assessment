import { GetWeatherQueryDto } from "./dto";
export declare class WeatherService {
    private readonly geoApi;
    private readonly forecastApi;
    private geocodeCity;
    private fetchCurrent;
    getWeather(filters: GetWeatherQueryDto): Promise<{
        location: any;
        timezone: any;
        current: any;
        units: any;
    }>;
}
