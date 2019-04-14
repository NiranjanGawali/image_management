'use strict';

require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
	PORT : process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	NODE_ENV: process.env.NODE_ENV,
	DEV_URL : process.env.DEV_URL,
	PROJECT_DIR: __dirname,
	LOGGER: true,
	CLUSTERING: false,
	FILE_PATH: process.env.FILE_PATH,
	FILE_PATH_PROD: process.env.FILE_PATH_PROD
}