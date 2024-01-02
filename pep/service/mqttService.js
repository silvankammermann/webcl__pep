import "./serviceDoc.js"
import { client } from "../../mqtt/mqttClient.js";

export { pepServices }

/**
 * Concrete factory for local {@link PepService} functions.
 * @returns {PepService}
 */
const pepServices = () => {

    const mqttClient = client(mqttBroker, mqttPort, mqttClientId);
    mqttClient.subscribe("pep", msg => {
        const payload = JSON.parse(msg.payloadString);
        /* TODO */
    })

    const loadDevelopers = callback => {
        /* TODO */
    }

    const loadProjects = callback => {
        /* TODO */
    };

    return { loadDevelopers, loadProjects };
};