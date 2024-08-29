import { createApp } from './app.js';
import { bovinoModel, fincaModel, userModel } from './models/mysql/mootest.js';

createApp ({bovinoModel:bovinoModel, fincaModel:fincaModel, userModel:userModel})