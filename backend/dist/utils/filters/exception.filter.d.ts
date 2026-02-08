import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class ExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: any, host: ArgumentsHost): Promise<void>;
}
