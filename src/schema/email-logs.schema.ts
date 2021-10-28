import { Prop, Schema, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type EmailLogsDocument = EmailLogs & Document;

@Schema()
export class EmailLogs extends Document {

  @Prop({ required: true, index: true })
    email: string;

  @Prop({ required: true })
  newsletter_name: string;


  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

}

export const EmailLogsSchema = SchemaFactory.createForClass(EmailLogs);