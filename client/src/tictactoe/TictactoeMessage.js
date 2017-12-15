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
                console.log(gameEvent);
                this.setState({
                    lastMessage: gameEvent.type,
                    user: gameEvent.side
// When debugging, it is very nice to see last event in UI
//                    lastMessage: JSON.stringify(gameEvent)
                });
            })
        }
        componentWillUnmount(){
            this.unsubscribe();
        }
        render() {
            console.log(this.state.lastMessage);
            return <div className="TictactoeMessage">
                <div className="lastMessage">
                    {this.state.lastMessage + " " + this.state.user}
                </div>
            </div>
        }
    }
    return TictactoeMessage;
}