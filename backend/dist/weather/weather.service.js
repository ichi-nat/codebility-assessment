"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const http_consumer_1 = require("../utils/http-consumer");
const error_codes_constant_1 = require("../common/constants/error-codes.constant");
let WeatherService = class WeatherService {
    geoApi = (0, http_consumer_1.genericHttpConsumer)("https://geocoding-api.open-meteo.com");
    forecastApi = (0, http_consumer_1.genericHttpConsumer)("https://api.open-meteo.com");
    async geocodeCity(city) {
        const res = await this.geoApi.get("/v1/search", {
            params: { name: city, count: 1, language: "en", format: "json" },
        });
        const top = res.data?.results?.[0];
        if (!top)
            throw new common_1.NotFoundException({
                code: error_codes_constant_1.ErrorCodesConstant.WEATHER_CITY_NOT_FOUND,
                message: `City not found: ${city}`,
            });
        return {
            name: top.name,
            country: top.country,
            latitude: top.latitude,
            longitude: top.longitude,
        };
    }
    async fetchCurrent(latitude, longitude) {
        const res = await this.forecastApi.get("/v1/forecast", {
            params: {
                latitude,
                longitude,
                current: "temperature_2m,relative_humidity_2m,wind_speed_10m",
                timezone: "auto",
            },
        });
        return res.data;
    }
    async getWeather(filters) {
        const { city, lat, lon } = filters;
        const hasCity = !!city;
        const hasCoords = typeof lat === "number" && typeof lon === "number";
        if (!hasCity && !hasCoords) {
            throw new common_1.BadRequestException({
                code: error_codes_constant_1.ErrorCodesConstant.WEATHER_INVALID_QUERY,
                message: "Provide either city OR lat+lon.",
            });
        }
        if (hasCity && hasCoords) {
            throw new common_1.BadRequestException({
                code: error_codes_constant_1.ErrorCodesConstant.WEATHER_INVALID_QUERY,
                message: "Use only one: city OR lat+lon.",
            });
        }
        let latitude;
        let longitude;
        let location;
        if (hasCity) {
            const geo = await this.geocodeCity(city);
            latitude = geo.latitude;
            longitude = geo.longitude;
            location = geo;
        }
        else {
            latitude = lat;
            longitude = lon;
            location = { latitude, longitude };
        }
        const data = await this.fetchCurrent(latitude, longitude);
        return {
            location,
            timezone: data.timezone,
            current: data.current,
            units: data.current_units,
        };
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)()
], WeatherService);
//# sourceMappingURL=weather.service.js.map