import { Observer } from '@content/utils/Observer';

import {
  processMatchPage,
  unprocessMatchPage,
} from './processors/processMatchPage/processMatchPage';
import { processPlayerProfile } from './processors/processPlayerProfile/processPlayerProfile';

import { PageName } from './utils/Observer';

Observer.registerProcessor({
  pageName: PageName.MATCH_PAGE,
  process: processMatchPage,
  unprocess: unprocessMatchPage,
}).registerProcessor({
  pageName: PageName.PLAYER_PAGE,
  process: processPlayerProfile,
});
