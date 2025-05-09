import mitt from 'mitt';
import { Events } from '../stocks/domain/Events.js';
import PurchaseResultsSubscriber from '../stocks/useCases/purchaseResultSubscriber/index.js';

export const pubsub = mitt<Events>();
PurchaseResultsSubscriber.subscribe(pubsub);
