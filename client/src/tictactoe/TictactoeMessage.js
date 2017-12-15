import React from 'react';
import './gameboard.css';

export default function (injected) {
    const eventRouter = injected('eventRouter');

    class TictactoeMessage extends React.Component {
        constructor() {
            super();
            this.state = {
                lastMessage: "Nothing happened yet",
                user: "",
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
