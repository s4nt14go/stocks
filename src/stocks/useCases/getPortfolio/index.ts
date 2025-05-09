import { createRequire } from 'module';
import { prefixSrcDir } from '../../../utils/utils.js';
import { PurchaseRepo } from '../../repos/PurchaseRepo.js';
import { UserRepo } from '../../repos/UserRepo.js';
import { GetPortfolio } from './GetPortfolio.js';

const require = createRequire(import.meta.url);
const models = require(prefixSrcDir('infra/sequelize/models/index.cjs'));
const purchaseRepo = new PurchaseRepo(models.Purchase);
const userRepo = new UserRepo(models.User);

export default new GetPortfolio({
  purchaseRepo,
  userRepo,
});
