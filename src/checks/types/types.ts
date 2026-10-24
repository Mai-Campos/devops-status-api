export interface CheckResponse {
  id: number;
  service: string;
  status: 'UP' | 'DOWN';
  responseTimeMs: number;
  createdAt: Date;
}

export interface StatsResponse {
  total: number;
  up: number;
  down: number;
  averageResponseTimeMs: number;
}
