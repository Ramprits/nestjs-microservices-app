import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [DatabaseModule, ReservationModule, LoggerModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
