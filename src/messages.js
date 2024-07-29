/**
 * @file
 * Message template overrides.
 */

((Drupal) => {
  /**
   * Overrides message theme function.
   *
   * @param {object} message
   *   The message object.
   * @param {string} message.text
   *   The message text.
   * @param {object} options
   *   The message context.
   * @param {string} options.type
   *   The message type.
   * @param {string} options.id
   *   ID of the message, for reference.
   *
   * @return {HTMLElement}
   *   A DOM Node.
   */
  Drupal.theme.message = ({ text }, { type, id }) => {
    const messagesTypes = Drupal.Message.getMessageTypeLabels();
    const messageWrapper = document.createElement('div');
    // For BootStrap we need a different kind of alert types.
    let alertType;
    let alertIconClass;
    switch (type) {
      case 'error':
        alertType = 'danger';
        alertIconClass = 'fas fa-2x fa-times-circle';
        break;

      case 'status':
        alertType = 'success';
        alertIconClass = 'fas fa-2x fa-check-circle';
        break;

      default:
        alertType = type;
        alertIconClass = 'fas fa-2x fa-exclamation-circle';
        break;
    }
    messageWrapper.setAttribute('class', `messages messages--${type} messages-list__item alert osu-alert-${alertType} alert-dismissible fade show`);
    messageWrapper.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
    messageWrapper.setAttribute('aria-labelledby', `${id}-title`);
    messageWrapper.setAttribute('data-drupal-message-id', id);
    messageWrapper.setAttribute('data-drupal-message-type', type);

    messageWrapper.innerHTML = `
    <div class="messages__header">
      <h2 id="${id}-title" class="messages__title">
        ${messagesTypes[type]}
      </h2>
    </div>
    <div class="messages__content d-flex align-items-center">
    <i class="${alertIconClass} me-2"></i>
      ${text}
    </div>
    <button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button"></button>
  `;

    return messageWrapper;
  };
})(Drupal);
