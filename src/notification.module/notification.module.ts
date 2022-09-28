import { Module } from '@nestjs/common';
import { EmailService } from './email.service/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot()],
	exports: [EmailService],
	providers: [EmailService],
})
export class NotificationModule {}
