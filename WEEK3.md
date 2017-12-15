# Week 3 

We also added scheduled build on Jenkins. Builds are automatically run at 23 pm. 

* [x] Url to your Jenkins instance (if login credentials are needed and your repo is public please send them as comments in Canvas)
  * https://tinyurl.com/hgop-jenkins
  * (http://ec2-13-58-66-142.us-east-2.compute.amazonaws.com:8080/)
  * Username: hgop
  * Password: *see canvas*
* [x] Url to your live TicTacToe instance
  * https://tinyurl.com/hgop-tictactoe
  * (http://ec2-18-217-78-199.us-east-2.compute.amazonaws.com:8000)
* [x] Public Url to your Datadog
  * https://tinyurl.com/hgop-datadog
  * (https://p.datadoghq.com/sb/b0d4bf5e7-c943ab17c9)
* [x] List of things you finished / did not finish (with comments):
  * [x] Completed the migrations needed for the application to work
    * We created a file (20171211141238-aggregation-id.js) that added a column aggregation_id to eventLog table.
  * [X] On Git push Jenkins pulls my code and the Tic Tac Toe application is deployed through a build pipeline, but only if all my tests are successful
  * [X] Filled out the `Assignments:` for the API and Load tests
    * We have a file assignment.md, found at ~/apitest/assignment.md where we answered the questions.
    * Console log statements found in: 
      * test-api.js
      * user-api.js
      * incoming-socket-message-dispatcher.js
      * outgoing-socket-io-message-port.js
      * message-router.js
      * apitest.dbbackdoor.js
        * We commmented out the logstatements because of load tests, they were making the tests slow!
  * [x] The API and Load test run in my build pipeline on Jenkins and everything is cleaned up afterwards
  * [x] My test reports are published in Jenkins
  * [x] My Tic Tac Toe game works, two people can play a game till the end and be notified who won.
  * [x] My TicCell is tested
  * [x] I've set up Datadog
