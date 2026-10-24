import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateCheckDto } from '../dto/create-check.dto.js';
import { QueryResult } from 'pg';
import { CheckResponse } from '../types/types.js';

@Injectable()
export class CheckRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  getChecks(): Promise<QueryResult<CheckResponse>> {
    return this.databaseService.query<CheckResponse>(
      'SELECT id, service, status, response_time_ms AS "responseTimeMs", created_at AS "createdAt" FROM checks',
    );
  }

  getCheckById(id: number): Promise<QueryResult<CheckResponse>> {
    return this.databaseService.query<CheckResponse>(
      'SELECT id, service, status, response_time_ms AS "responseTimeMs", created_at AS "createdAt" FROM checks WHERE id = $1',
      [id],
    );
  }

  createCheck(dto: CreateCheckDto): Promise<QueryResult<CheckResponse>> {
    return this.databaseService.query<CheckResponse>(
      'INSERT INTO checks (service, status, response_time_ms) VALUES ($1, $2, $3)  RETURNING id, service, status, response_time_ms AS "responseTimeMs", created_at AS "createdAt"',
      [dto.service, dto.status, dto.responseTimeMs],
    );
  }
}
