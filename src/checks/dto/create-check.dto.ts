import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCheckDto {
  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsIn(['UP', 'DOWN'])
  status: 'UP' | 'DOWN';

  @IsInt()
  @Min(0)
  responseTimeMs: number;
}
