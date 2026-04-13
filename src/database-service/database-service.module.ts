import { Module, Global } from '@nestjs/common';
import {DatabaseServiceService} from "./database-service.service"

@Global()
@Module({
    providers: [DatabaseServiceService],
    exports: [DatabaseServiceService]
})
export class DatabaseServiceModule {
}
