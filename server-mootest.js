import { createApp } from './app.js';
import { bovinoModel } from './models/mysql/bovino.model.js';
import { userModel } from './models/mysql/user.model.js';
import { fincaModel } from './models/mysql/finca.model.js';
import { authModel } from './models/mysql/auth.model.js';

createApp ({bovinoModel:bovinoModel, fincaModel:fincaModel, userModel:userModel, authModel:authModel})