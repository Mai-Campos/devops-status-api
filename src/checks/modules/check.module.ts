import { Module } from '@nestjs/common';
import { CheckController } from '../controllers/check.controller.js';
import { CheckRepository } from '../repositories/check.repository.js';
import { CheckService } from '../services/check.service.js';
import { DatabaseModule } from '../../database/database.module.js';

@Module({
  providers: [CheckService, CheckRepository],
  controllers: [CheckController],
  imports: [DatabaseModule],
})
export class CheckModule {}
