import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepositoryService } from './reservation.repository.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepositoryService],
})
export class ReservationModule {}
