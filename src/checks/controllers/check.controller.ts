import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CheckService } from '../services/check.service.js';
import type { CheckResponse, StatsResponse } from '../types/types.js';
import { CreateCheckDto } from '../dto/create-check.dto.js';

@Controller()
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Get('checks')
  getChecks(): Promise<CheckResponse[]> {
    return this.checkService.getChecks();
  }

  @Get('checks/stats')
  getStats(): Promise<StatsResponse> {
    return this.checkService.getStats();
  }

  @Get('checks/:id')
  getCheckById(@Param('id', ParseIntPipe) id: number): Promise<CheckResponse> {
    return this.checkService.getCheckById(id);
  }

  @Post('checks')
  createCheck(@Body() dto: CreateCheckDto): Promise<CheckResponse> {
    return this.checkService.createCheck(dto);
  }
}
