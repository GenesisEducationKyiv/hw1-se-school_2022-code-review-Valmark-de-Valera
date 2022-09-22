import { Container } from 'inversify';
import ICacheService from './services/cache/interfaces/interface.cache-service';
import { DIRepositories, DIServices } from './DITypes';
import NodeCacheService from './services/cache/node.cache-service';
import SubscribersService from './services/subscriber/subscriber-service';
import FinanceService from './services/rates/finance-service';
import ISubscriberRepository from './repository/subscriber/interfaces/interface.subscriber.repository';
import FileSubscriberRepository from './repository/subscriber/file.subscriber.repository';
import FinanceProviderFabric from './services/rates/finance-provider.fabric';
import EmailService from './services/email/email-service';

const container = new Container();
container.bind<ICacheService>(DIServices.CacheService).to(NodeCacheService).inSingletonScope();
container.bind<FinanceService>(DIServices.FinanceService).to(FinanceService).inSingletonScope();
container.bind<SubscribersService>(DIServices.SubscribersService).to(SubscribersService);
container.bind<EmailService>(DIServices.EmailService).to(EmailService);
container.bind<FinanceProviderFabric>(DIServices.FinanceProviderFabric).to(FinanceProviderFabric);
container
	.bind<ISubscriberRepository>(DIRepositories.SubscribersRepository)
	.to(FileSubscriberRepository);

export { container };
