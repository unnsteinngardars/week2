var path = require('path');
const file = path.basename(__filename);
module.exports=function(injected){
    const socketIo = injected('io');
    const messageRouter = injected('messageRouter');

    const outgoingMessageLogger = injected('outgoingMessageLogger', true);
    const fs = injected('fs', true);

    return {
        dispatchThroughIo(routingKey, socketVerb, conditionFn){
            // console.log("socketVerb " + socketVerb + " in " + file);
            socketVerb = socketVerb || 'eventIssued';
            conditionFn = conditionFn || function(){
                return true;
            };
            messageRouter.on(routingKey, (messageObj)=>{
                if(conditionFn(messageObj)){
                    //console.debug("Dispatching message over socket.io: " + socketVerb + " message: ", messageObj );
                    if(outgoingMessageLogger){
                        outgoingMessageLogger(socketVerb, messageObj);
                    }
                    socketIo.emit(socketVerb, messageObj);
                }
            })
        }
    };
};

