const vars = { env: process.env };

vars.ENV            = (vars.env.ENV || vars.env.NODE_ENV || 'production').toLowerCase();
vars.PORT           = vars.env.PORT || 3000;
vars.PROTOCOL       = vars.env.PROTOCOL || 'http';
vars.APP_HOST       = vars.env.APP_HOST || `localhost:${vars.PORT}`;
vars.APP_URL        = vars.env.APP_URL || `${vars.PROTOCOL}://${vars.APP_HOST}`;
vars.APP_HEALTH_URL = vars.env.APP_HEALTH_URL || `${vars.APP_URL}`;
vars.APP_OWNER      = vars.env.APP_OWNER || 'domain';
vars.APP_PARENT     = vars.env.APP_PARENT || 'subdomain';
vars.APP_NAME       = vars.env.APP_NAME || require('../package.json').name || 'node-express-web';
vars.APP_VERSION    = vars.env.APP_VERSION || require('../package.json').version || '1.0.0';
vars.APP_UTI        = vars.env.APP_UTI || `com.${vars.APP_OWNER}.${vars.APP_PARENT}.${vars.APP_NAME}`;

vars.envProd  = (['prod', 'production'].indexOf(vars.ENV) > -1)            ? 'prod'  : false;
vars.envStage = (['uat', 'staging', 'qa', 'test'].indexOf(vars.ENV) > -1)  ? 'uat'   : false;
vars.envDev   = (['dev', 'develop', 'development'].indexOf(vars.ENV) > -1) ? 'dev'   : false;
vars.envLocal = (['local', 'developer'].indexOf(vars.ENV) > -1)            ? 'local' : false;

vars.envPublic  = (vars.envLocal || vars.envDev) ? false : true;
vars.envPrivate = ( ! vars.envPublic );

vars.APP_ENV = vars.envProd || vars.envStage || vars.envDev || vars.envLocal;
vars.APP_TAG = vars.env.APP_TAG || `${vars.APP_NAME}-v${vars.APP_VERSION}-${vars.APP_ENV}`.toLowerCase();

// Environment/Stage/Feature Toggles/Conditionals
vars.toggle = {
  feature: {
    Abc: (vars.envPrivate) ? true : false,
    Xyz: (vars.envLocal) ? true : false,
  },
};

module.exports = vars;
