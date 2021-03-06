import { notify } from 'react-notify-toast';

export default class Message {
  static setSuccessMessage(message) {
    const color = { background: '#76daff', text: '#000000' };
    notify.show(message, 'custom', 3000, color);
  }

  static setErrorMessage(message) {
    const color = { background: '#EB4D4B', text: '#FFFFFF' };
    notify.show(message, 'custom', 3000, color);
  }
}
