"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let ExceptionsFilter = ExceptionsFilter_1 = class ExceptionsFilter {
    logger = new common_1.Logger(ExceptionsFilter_1.name);
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal Server Error";
        let errorCode = null;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const resBody = exception.getResponse();
            if (typeof resBody === "object" && resBody !== null) {
                errorCode = resBody["code"] ?? null;
                message = resBody["message"] ?? resBody;
            }
            else {
                message = resBody;
            }
        }
        else if (typeof exception === "string") {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = exception;
        }
        else if (typeof exception === "object") {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = exception.message;
            errorCode = exception.code;
        }
        if (status !== common_1.HttpStatus.BAD_REQUEST) {
            this.logger.error(exception);
        }
        response.status(status).json({
            code: errorCode ? errorCode : status,
            message,
        });
    }
};
exports.ExceptionsFilter = ExceptionsFilter;
exports.ExceptionsFilter = ExceptionsFilter = ExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], ExceptionsFilter);
//# sourceMappingURL=exception.filter.js.map