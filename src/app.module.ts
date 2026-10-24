import { Module } from '@nestjs/common';
import { CheckModule } from './checks/modules/check.module.js';

@Module({
  imports: [CheckModule],
})
export class AppModule {}
