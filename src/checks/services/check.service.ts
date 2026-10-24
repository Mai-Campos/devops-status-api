import { Injectable, NotFoundException } from '@nestjs/common';
import type { CheckResponse, StatsResponse } from '../types/types.js';
import { CreateCheckDto } from '../dto/create-check.dto.js';
import { CheckRepository } from '../repositories/check.repository.js';

@Injectable()
export class CheckService {
  constructor(private readonly repo: CheckRepository) {}

  async createCheck(dto: CreateCheckDto): Promise<CheckResponse> {
    const result = await this.repo.createCheck(dto);

    return result.rows[0];
  }

  async getChecks(): Promise<CheckResponse[]> {
    const checks = await this.repo.getChecks();

    return checks.rows;
  }

  async getCheckById(id: number): Promise<CheckResponse> {
    const result = await this.repo.getCheckById(id);

    if (!result.rows[0])
      throw new NotFoundException(`Check with id ${id} not found`);

    return result.rows[0];
  }

  async getStats(): Promise<StatsResponse> {
    const checks = (await this.repo.getChecks()).rows;

    const stats: StatsResponse = {
      total: checks.length,
      up: checks.filter((check) => {
        return check.status === 'UP';
      }).length,
      down: checks.filter((check) => {
        return check.status === 'DOWN';
      }).length,
      averageResponseTimeMs: this.calculateAverageResponseTimeMs(checks),
    };

    return stats;
  }

  private calculateAverageResponseTimeMs(checks: CheckResponse[]): number {
    if (checks.length === 0) return 0;
    let averageResponseTimeMs = 0;

    for (let i = 0; i < checks.length; i++) {
      averageResponseTimeMs += checks[i].responseTimeMs;
    }

    return (averageResponseTimeMs /= checks.length);
  }
}
