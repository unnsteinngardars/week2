const fs = require('fs');
var path = require('path');
const file = path.basename(__filename);
module.exports=function(injected){


    const io = injected('io');
    const RoutingContext = injected('RoutingContext');

    const incomingEventLogFile="./test-api-incoming-events.log";
    const outgoingCommandLogFile="./test-api-outgoing-commands.log";

    let connectCount =0;

    function testAPI(){
        let waitingFor=[];
        let commandId=0;

        let routingContext = RoutingContext(inject({
            io,
            env:"test",
            incomingEventLogger: function(verb, message){
                fs.appendFile(incomingEventLogFile,verb + " - " + JSON.stringify(message) + "\n", function(err){
                    if(err){
                        console.error("Error writing to log file " + incomingEventLogFile + "Error:\n" + err);
                    }
                });
            },
            outgoingCommandLogger: function(verb, message){
                fs.appendFile(outgoingCommandLogFile,verb + " - " + JSON.stringify(message) + "\n", function(err){
                    if(err){
                        console.error("Error writing to log file " + outgoingCommandLogFile + "Error:\n" + err);
                    }
                });
            }
        }));

        connectCount++;
        const me = {
            // Assignment: Trace this call - back and forth - through the code.
            // Put in log statements that enable you to trace the messages going back and forth.
            // Result is a list of modules/functions in this source code which get invoked when cleanDatabase is called.
            cleanDatabase:()=>{
                console.log("Inside cleanDatabase function in " + file);
                let cmdId = commandId++;
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"cleanDatabase"});
                return me;

            },
            waitForCleanDatabase:(whenClean)=>{
                console.log("Inside waitForCleanDatabase function in " + file);
                console.log("event 'expectDatabaseCleaned' pushed at " + Date());
                waitingFor.push("expectDatabaseCleaned");
                routingContext.eventRouter.on('databaseCleaned', function(chatMessage){
                    let msg = waitingFor.pop(); // expectDatabaseCleaned
                    console.log("event '" + msg + "' popped at " + Date());
                    whenClean && whenClean();
                });
                return me;

            },
            then:(whenDoneWaiting)=>{
                console.log("Inside then function in " + file);
                function waitLonger(){
                    if(waitingFor.length>0){
                        setTimeout(waitLonger, 0);
                        return;
                    }
                    whenDoneWaiting();
                }
                waitLonger();
                return me;
            },
            disconnect:function(){
                console.log("Inside disconnect function in " + file);
                routingContext.socket.disconnect();
            }
            
        };
        return me;
    }

    return testAPI;
};
