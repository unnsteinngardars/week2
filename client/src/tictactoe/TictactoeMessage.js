import React from 'react';
import './gameboard.css';

export default function (injected) {
    const eventRouter = injected('eventRouter');

    class TictactoeMessage extends React.Component {
        constructor() {
            super();
            this.state = {
                lastMessage: "Nothing happened yet",
                user: "no user available",
            }
        }

        componentWillMount() {
            this.unsubscribe = eventRouter.on('*', (gameEvent) => {
                this.setState({
                    lastMessage: gameEvent.type,
                    user: gameEvent.move.side
                });
            })
        }
        componentWillUnmount(){
            this.unsubscribe();
        }
        render() {
            if(this.state.lastMessage == "GameDraw"){
          	    return <div className="TicTacToeMessage">
                    {this.state.lastMessage}
                </div>
          }
          else {
              return <div className="TicTacToeMessage">
                  {this.state.lastMessage + " by player " + this.state.user}
              </div>
         }
      }
    }
    return TictactoeMessage;
}
