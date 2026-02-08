"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWeatherQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetWeatherQueryDto {
    city;
    lat;
    lon;
}
exports.GetWeatherQueryDto = GetWeatherQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], GetWeatherQueryDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.city == null && o.lon != null),
    (0, class_validator_1.IsDefined)({ message: "lat is required when lon is provided." }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], GetWeatherQueryDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.city == null && o.lat != null),
    (0, class_validator_1.IsDefined)({ message: "lon is required when lat is provided." }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], GetWeatherQueryDto.prototype, "lon", void 0);
//# sourceMappingURL=get-weather.query.dto.js.map