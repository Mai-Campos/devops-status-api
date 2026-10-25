import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { CreateCheckDto } from '../../dto/create-check.dto.js';
import { CheckRepository } from '../../repositories/check.repository.js';
import { CheckService } from '../../services/check.service.js';
import { CheckResponse } from '../../types/types.js';

describe('CheckService', () => {
  let service: CheckService;

  const repo = {
    createCheck: vi.fn(),
    getChecks: vi.fn(),
    getCheckById: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    service = new CheckService(repo as unknown as CheckRepository);
  });

  const checks: CheckResponse[] = [
    {
      id: 1,
      service: 'postgres',
      status: 'UP',
      responseTimeMs: 42,
      createdAt: new Date('2026-01-01T10:00:00Z'),
    },
    {
      id: 2,
      service: 'api',
      status: 'DOWN',
      responseTimeMs: 0,
      createdAt: new Date('2026-01-01T10:01:00Z'),
    },
  ];

  describe('createCheck', () => {
    it('debería crear y devolver un check', async () => {
      const dto: CreateCheckDto = {
        service: 'postgres',
        status: 'UP',
        responseTimeMs: 42,
      };

      repo.createCheck.mockResolvedValue({
        rows: [checks[0]],
      });

      await expect(service.createCheck(dto)).resolves.toEqual(checks[0]);

      expect(repo.createCheck).toHaveBeenCalledWith(dto);
      expect(repo.createCheck).toHaveBeenCalledOnce();
    });
  });

  describe('getChecks', () => {
    it('debería devolver todos los checks', async () => {
      repo.getChecks.mockResolvedValue({
        rows: checks,
      });

      await expect(service.getChecks()).resolves.toEqual(checks);

      expect(repo.getChecks).toHaveBeenCalledOnce();
    });

    it('debería devolver una lista vacía si no existen checks', async () => {
      repo.getChecks.mockResolvedValue({
        rows: [],
      });

      await expect(service.getChecks()).resolves.toEqual([]);
    });
  });

  describe('getCheckById', () => {
    it('debería devolver un check cuando existe', async () => {
      repo.getCheckById.mockResolvedValue({
        rows: [checks[0]],
      });

      await expect(service.getCheckById(1)).resolves.toEqual(checks[0]);

      expect(repo.getCheckById).toHaveBeenCalledWith(1);
    });

    it('debería lanzar NotFoundException si el check no existe', async () => {
      repo.getCheckById.mockResolvedValue({
        rows: [],
      });

      await expect(service.getCheckById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getStats', () => {
    it('debería calcular correctamente las estadísticas', async () => {
      repo.getChecks.mockResolvedValue({
        rows: checks,
      });

      await expect(service.getStats()).resolves.toEqual({
        total: 2,
        up: 1,
        down: 1,
        averageResponseTimeMs: 21,
      });
    });

    it('debería devolver estadísticas en cero si no existen checks', async () => {
      repo.getChecks.mockResolvedValue({
        rows: [],
      });

      await expect(service.getStats()).resolves.toEqual({
        total: 0,
        up: 0,
        down: 0,
        averageResponseTimeMs: 0,
      });
    });
  });
});
