export { client }

/**
 * A client for bidirectional communication via MQTT.
 * @param   {!String} host      -
 * @param   {!Number} port      -
 * @param   {!String} clientId  -
 * @returns {MqttClient}        -
 */
const client = (host, port, clientId) => {
    const Paho = window.Paho;
    const client = new Paho.MQTT.Client(host, port, clientId);
    const onConnectedQueue = [];
    const callbackMap = new Map();

    client.connect({
        onSuccess: () => {
            console.log("MQTT client connected.");
            onConnectedQueue.forEach(f => f());
        }
    });

    client.onConnectionLost = responseObject => {
        console.error("MQTT client lost connection: " + responseObject.errorMessage);
    }

    client.onMessageArrived = message => {
        console.log("MQTT message arrived: " + message.payloadString + " on topic " + message.destinationName)

        if (callbackMap.has(message.destinationName))
            callbackMap.get(message.destinationName).forEach(f => f(message));
        else console.warn("No callback registered for topic " + message.destinationName);
    };

    const subscribe = (topic, callback) => {
        if (!client.isConnected()) {
            onConnectedQueue.push(() => subscribe(topic, callback));
            return;
        }
        client.subscribe(topic);
        if (callbackMap.has(topic)) {
            callbackMap.get(topic).push(callback);
        } else {
            callbackMap.set(topic, [callback]);
        }
        console.log("Subscribed to topic " + topic)
    };

    const publish = (topic, message) => {
        if (!client.isConnected()) {
            onConnectedQueue.push(() => publish(topic, message));
            return;
        }
        client.send(topic, message)
        console.log("Published to topic " + topic + ": " + message)
    };

    return { subscribe, publish }
};