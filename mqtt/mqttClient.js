export { client }

/**
 * A client for bidirectional communication via MQTT.
 * @param   {!String} host      -
 * @param   {!Number} port      -
 * @param   {String} clientId  -
 * @returns {Promise<MqttClient>}        -
 */
const client = (host, port, clientId = "pep-" + Math.random().toString(16)) => {
    return new Promise((resolve, reject) => {

        const client = new window.Paho.MQTT.Client(host, port, clientId);
        const callbackMap = new Map();

        client.connect({
            onSuccess: () => {
                console.log("MQTT client connected.");
                resolve({ subscribe, publish });
            },
            onFailure: (err) => {
                console.error(err);
                reject();
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
            client.subscribe(topic);
            if (callbackMap.has(topic)) {
                callbackMap.get(topic).push(callback);
            } else {
                callbackMap.set(topic, [callback]);
            }
            console.log("Subscribed to topic " + topic)
        };

        const publish = (topic, message) => {
            client.send(topic, message)
            console.log("Published to topic " + topic + ": " + message)
        };

    });
};
