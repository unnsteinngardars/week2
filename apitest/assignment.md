# Assignments from apitest folder

## Assignment in user-api.js 
*Assignment*: Explain what the push/pop functions do for this API. What effect would it have on the fluent API if we did not have them?
Answer: The push and pop functions are pushing and 

## Assignment in test-api.js
*Assignment*: Trace this call - back and forth - through the code.
Put in log statements that enable you to trace the messages going back and forth.
Result is a list of modules/functions in this source code which get invoked when cleanDatabase is called.
Answer: example when running npm run apitest
```
1) User chat API
Inside waitForCleanDatabase function in test-api.js
event 'expectDatabaseCleaned' pushed at Mon Dec 11 2017 21:58:07 GMT+0000 (GMT)
Inside cleanDatabase function in test-api.js
message inside message-router.js
{ commandId: 0, type: 'cleanDatabase' }
Inside then function in test-api.js
message inside message-router.js
{ eventId: 'eventLogCleaned',
  type: 'tableCleaned',
  tableName: 'eventlog',
  _session: undefined }
message inside message-router.js
{ eventId: 'commandLogCleaned',
  type: 'tableCleaned',
  tableName: 'commandlog',
  _session: undefined }
message inside message-router.js
{ type: 'databaseCleaned', _session: undefined }
event 'expectDatabaseCleaned' popped at Mon Dec 11 2017 21:58:09 GMT+0000 (GMT)
Inside disconnect function in test-api.js
EVENT: sessionAck pushed on waitingFor.counters[verb] inside user-api.js at Mon Dec 11 2017 21:58:09 GMT+0000 (GMT)
EVENT: sessionAck popped from waitingFor.counters[verb] inside user-api.js at Mon Dec 11 2017 21:58:09 GMT+0000 (GMT)
.   ✔ should get user session information on connect
```

## tictactoe-game-player.js
*Assignment*: Explain how this apparently sequential code can function to play *two* sides of the game.
Answer:

*Assignment*: Run load tests. See them succeed a couple of times. 
Move expectMoveMade() and expectGameJoined() after joinGame() call, and expectGameCreated() after createGame() call like this: 
```userB.joinGame(userA.getGame().gameId).expectMoveMade('X').expectGameJoined().then(function () {```
Run load tests again. They should fail. Explain why they fail.

## tictactoe.loadtest.js
*Assignment*: Find appropriate numbers to configure the load test so it passes on your buildserver under normal load. */