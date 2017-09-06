'use strict';

const builder = require('botbuilder');
const botbuilder_azure = require('botbuilder-azure');
const path = require('path');

require('dotenv').config();

const utils = require('./businesslogic/utils');

const connector = utils.getConnector(builder);

const bot = new builder.UniversalBot(connector, {
    localizerSettings: {
        defaultLocale: process.env.DEFAULT_LOCALE
    }
});

bot.localePath(path.join(__dirname, './locale'));

bot.dialog('/', (session) => session.send('You said ' + session.message.text));

bot.dialog('/Cancelar', [
    function (session) {
        session.endDialog(`No hay problemas ${session.message.user.name.split(" ", 1)[0]}, hasta la próxima.`)
    }
]).triggerAction({ matches: /^cancelar$|^salir$|^terminar$|^exit$|^quit$/i });

module.exports = utils.startServer(connector);

