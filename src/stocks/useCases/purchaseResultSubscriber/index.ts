import { createRequire } from 'module';
import { prefixSrcDir } from '../../../utils/utils.js';
import { PurchaseResultSubscriber } from './PurchaseResultSubscriber.js';
import { PurchaseResultRepo } from '../../repos/PurchaseResultRepo.js';

const require = createRequire(import.meta.url);
const models = require(prefixSrcDir('infra/sequelize/models/index.cjs'));
const purchaseResultRepo = new PurchaseResultRepo(models.PurchaseResult);

export default new PurchaseResultSubscriber({
  purchaseResultRepo,
});
