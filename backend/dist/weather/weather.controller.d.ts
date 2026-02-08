import { GetWeatherQueryDto } from "./dto/get-weather.query.dto";
import { WeatherService } from "./weather.service";
export declare class WeatherController {
    private readonly weather;
    constructor(weather: WeatherService);
    get(filters: GetWeatherQueryDto): Promise<{
        location: any;
        timezone: any;
        current: any;
        units: any;
    }>;
}
