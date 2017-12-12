import React from 'react';

export default function (injected) {
    const eventRouter = injected('eventRouter');
    const commandPort = injected('commandPort');
    const generateUUID = injected('generateUUID');

    class TictactoeMessage extends React.Component {
        constructor() {
            super();
            this.state = {
                move:{

                }
            }
        }
        componentWillMount(){
            this.unsubscribe = eventRouter.on('MovePlaced', (moveEvent)=>{
            //    Key logic goes here. Remember---the cell gets all move events, not only its own.
                this.setState((prevState,props) =>{
                    if(moveEvent.move.xy.x === this.props.coordinates.x && moveEvent.move.xy.y === this.props.coordinates.y){
                        return {move:{side:moveEvent.move.side}};
                    }   
                });
            })
        }
        componentWillUnmount(){
            this.unsubscribe();
        }
        placeMove(coordinates){
            return ()=>{
                let cmdId = generateUUID();
                commandPort.routeMessage({
                    commandId:cmdId,
                    type:"PlaceMove",
                    gameId:this.props.gameId,
                    move:{
                        xy:coordinates,
                        side:this.props.mySide
                    }
                });
            }
        }
        render() {
            return <div ref="ticCell" className="ticcell" onClick={this.placeMove(this.props.coordinates)}>
                {this.state.move.side}
            </div>
        }
    }
    return TictactoeMessage;
}
