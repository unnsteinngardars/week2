# Assignments from apitest folder

## Assignment in user-api.js 
*Assignment*: Explain what the push/pop functions do for this API. What effect would it have on the fluent API if we did not have them?

* Answer: The push function pushes events into the queue counters[] that ensures that procedures are performed in the correct order. The pop function pops them out when the procedures have finished. If we would not have them then there would be nothing that assures that events are performed in the correct order and the game would be a mess!

## Assignment in test-api.js
*Assignment*: Trace this call - back and forth - through the code.
Put in log statements that enable you to trace the messages going back and forth.
Result is a list of modules/functions in this source code which get invoked when cleanDatabase is called.

* Answer: example when running npm run apitest

Output from running npm run apitest
```
1) User chat API
socketVerb issueCommand in outgoing-socket-io-message-port.js
Inside waitForCleanDatabase function in test-api.js
event 'expectDatabaseCleaned' pushed on Fri Dec 15 2017 11:01:52 GMT+0000 (GMT)
Inside cleanDatabase function in test-api.js
message inside message-router.js
{ commandId: 0, type: 'cleanDatabase' }
Inside then function in test-api.js
time upon entering Fri Dec 15 2017 11:01:52 GMT+0000 (GMT)
time upon exiting Fri Dec 15 2017 11:01:52 GMT+0000 (GMT)
message inside incoming-socket-message-dispatcher.js
{ eventId: 'eventLogCleaned',
  type: 'tableCleaned',
  tableName: 'eventlog',
  _session: undefined }
message inside message-router.js
{ eventId: 'eventLogCleaned',
  type: 'tableCleaned',
  tableName: 'eventlog',
  _session: undefined }
message inside incoming-socket-message-dispatcher.js
{ eventId: 'commandLogCleaned',
  type: 'tableCleaned',
  tableName: 'commandlog',
  _session: undefined }
message inside message-router.js
{ eventId: 'commandLogCleaned',
  type: 'tableCleaned',
  tableName: 'commandlog',
  _session: undefined }
message inside incoming-socket-message-dispatcher.js
{ type: 'databaseCleaned', _session: undefined }
message inside message-router.js
{ type: 'databaseCleaned', _session: undefined }
event 'expectDatabaseCleaned'2 popped at Fri Dec 15 2017 11:01:53 GMT+0000 (GMT) in test-api.js
Inside disconnect function in test-api.js
socketVerb issueCommand in outgoing-socket-io-message-port.js
EVENT: sessionAck pushed on waitingFor.counters[verb] inside user-api.js at Fri Dec 15 2017 11:01:53 GMT+0000 (GMT)
EVENT: sessionAck popped from waitingFor.counters[verb] inside user-api.js at Fri Dec 15 2017 11:01:53 GMT+0000 (GMT)
.   ✔ should get user session information on connect
```
Output from running npm run startserver:dev
```
socketVerb eventIssued in outgoing-socket-io-message-port.js
Server listening on port 8000
Command log count: 7
Event log count: 11
socketVerb queryResult in outgoing-socket-io-message-port.js
message inside incoming-socket-message-dispatcher.js
{ commandId: 0,
  type: 'cleanDatabase',
  _session: { clientId: 0, user: { userName: 'Anonymous#0', userId: 0 } } }
message inside message-router.js
{ commandId: 0,
  type: 'cleanDatabase',
  _session: { clientId: 0, user: { userName: 'Anonymous#0', userId: 0 } } }
DELETE FROM eventlog
DELETE FROM commandlog
event tableCleaned from apitest-dbbackdoor.js
message inside message-router.js
{ eventId: 'eventLogCleaned',
  type: 'tableCleaned',
  tableName: 'eventlog' }
event tableCleaned from apitest-dbbackdoor.js
message inside message-router.js
{ eventId: 'commandLogCleaned',
  type: 'tableCleaned',
  tableName: 'commandlog' }
event databaseCleaned from apitest-dbbackdoor.js
message inside message-router.js
{ type: 'databaseCleaned' }
```
## tictactoe-game-player.js
*Assignment*: Explain how this apparently sequential code can function to play *two* sides of the game.

* Answer: playOside is a function that is executed after userA has created a game and before all calls for userA. Each function chained to userA and userB is expecting an event before it can finish it's execution and therefore it works to make both player play against each other.

*Assignment*: Run load tests. See them succeed a couple of times. 
Move expectMoveMade() and expectGameJoined() after joinGame() call, and expectGameCreated() after createGame() call like this: 
```userB.joinGame(userA.getGame().gameId).expectMoveMade('X').expectGameJoined().then(function () {```
Run load tests again. They should fail. Explain why they fail.
* Answer: we changed the code and did not see any difference, we then forgot to switch back and ran the changed code every time we pushed to jenkins and until on friday when we were going over the assignment again. It never failed. So we changed it back.

## tictactoe.loadtest.js
*Assignment*: Find appropriate numbers to configure the load test so it passes on your buildserver under normal load.
* Answer: 
  * Locally: for tictactoe.loadtest.js we found out that the timelimit is 5 seconds and count is 30, those numbers have never failed, when we upped the count to 65 it failed sometimes and with 70 it almost failed every time. for chat.loadtest.js we found out that timelimit is 5 seconds and cound 100.
  * Jenkins: for tictactoe.loadtest.js we upped count to 40 and chat.loadtest.js we upped count to 120