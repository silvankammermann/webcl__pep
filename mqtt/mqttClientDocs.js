/**
 * @callback onMessageArrivedCallback
 * @param    {!Message} message - the message that arrived
 * @return   { void }
 */

/**
 *
 * @typedef subscribe
 * @param {String} topic - the topic to subscribe to
 * @param {onMessageArrivedCallback} callback - the callback to register
 * @return { void }
 */

/**
 * @function publish
 * @param {String} topic   - the topic to publish to
 * @param {String} message - the message to publish
 * @return { void }
 */

/**
 * Data structure that exposes MQTT functions to the client.
 *
 * @typedef MqttClient
 * @property { subscribe } subscribe - register a callback for a topic
 * @property { publish } publish     - publish a message to a topic
 */
