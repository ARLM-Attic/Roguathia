
import _ from 'lodash';
import GameState from '../init/gamestate';
import Settings from '../constants/settings';

export default class MessageQueue {
  static add(messageObj) {

    // attempt to hide messages from enemies that are too far away that interact with stuff, if applicable
    if(messageObj.entity) {
      let isInRange = false;
      _.each(GameState.players, player => {
        if(player.distBetween(messageObj.entity) <= player.getSight()) isInRange = true;
      });
      if(!isInRange) return;
    }
    GameState.messages.unshift({ turnsLeft: Settings.game.display.turns, message: messageObj.message });
    GameState.messages.length = Settings.game.display.log; // cap the messages off at the last 50
    messageObj.turn = _.max(_.pluck(GameState.players, 'currentTurn'));
    GameState.emit('log', messageObj);
  }
  
  static viewAllMessages() {
    GameState.messages = _(GameState.messages)
      .compact()
      .each((msg) => msg.turnsLeft--)
      .reject((msg) => msg.turnsLeft <= 0)
      .value();
  }
}

export const MessageTypes = {
  COMBAT: 'Combat',
  CHARACTER: 'Character',
  DUNGEON: 'Dungeon',
  META: 'Meta',
  ITEM: 'Item'
};