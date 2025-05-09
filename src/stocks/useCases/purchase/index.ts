import { createRequire } from 'module';
import { prefixSrcDir } from '../../../utils/utils.js';
import { PurchaseRepo } from '../../repos/PurchaseRepo.js';
import { Purchase } from './Purchase.js';
import { UserRepo } from '../../repos/UserRepo.js';
import { pubsub } from '../../../infra/events.js';

const require = createRequire(import.meta.url);
const models = require(prefixSrcDir('infra/sequelize/models/index.cjs'));
const purchaseRepo = new PurchaseRepo(models.Purchase);
const userRepo = new UserRepo(models.User);

export default new Purchase({
  purchaseRepo,
  userRepo,
  pubsub,
});
