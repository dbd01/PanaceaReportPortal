"use strict"
var config = {};


//cors settigns
config.validDomains= "*";
//web server settigns
config.serverPort= process.env.port || 1457;
config.useWebHttps= false;
config.serverHost= "pandora.dotbydot.eu";

//polyphemus settings
config.applicationName= "PRPServerCAS";
config.polyphemusPort= 4451;
config.polyphemusHost= "pandora.dotbydot.eu";
config.polyphemusActive= true;
config.polyphemusHttps= true;
config.useCAS=true;
config.CASService="https://pandora.dotbydot.eu:4457/cas";
config.CASResponseFormat="JSON"; //other option is XML 
config.CASRedirectAfterSuccess='http://pandora.dotbydot.eu:4453/#/';
config.CASRedirectAfterLogout='http://pandora.dotbydot.eu:4453';

module.exports = config;
 