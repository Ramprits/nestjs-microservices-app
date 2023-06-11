import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ReservationDocument } from './models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepositor extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationRepositor.name);

  constructor(
    @InjectModel(ReservationDocument.name) repositoryModel: Model<ReservationDocument>,
  ) {
    super(repositoryModel);
  }
}
