"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericHttpConsumer = exports.api = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const api = (baseURL, token = "") => {
    const instance = axios_1.default.create({
        baseURL,
        timeout: 10_000,
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (token) {
        instance.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    instance.interceptors.response.use((res) => res, (err) => {
        common_1.Logger.log("axios error", err?.message ?? err);
        if (err?.code === "ECONNREFUSED" || err?.code === "ETIMEDOUT") {
            return Promise.reject(new common_1.ServiceUnavailableException());
        }
        const status = err?.response?.status;
        const data = err?.response?.data;
        if (!status) {
            return Promise.reject(new common_1.BadGatewayException("Upstream request failed."));
        }
        return Promise.reject(new common_1.HttpException(data ?? "Upstream error", status));
    });
    return instance;
};
exports.api = api;
const genericHttpConsumer = (baseURL = "") => (0, exports.api)(baseURL);
exports.genericHttpConsumer = genericHttpConsumer;
//# sourceMappingURL=http-consumer.js.map