import "./serviceDoc.js"
import { client } from "../../mqtt/mqttClient.js";

export { pepServices }


const initialData = {
    developers: [
        {id:0, img:"img/img0.jpg", name: "Marie-Claude Federspiel"},
        {id:1, img:"img/img1.jpg", name: "Christian Ribeaud"},
    ],
    projects: [
        {id:0, color: 'blue',   name: "PEP"},
        {id:1, color: 'green', name: "Web Clients"},
    ]
}

/**
 * Concrete factory for local {@link PepService} functions.
 * @returns {PepService}
 */
const pepServices = (broker, port, topic, imgPath) => {

    const mqttClient = client(broker, port);

    const data = {
        developers: [],
        projects: []
    }

    const init = new Promise(resolve => {
        mqttClient.then(({subscribe, publish}) => {
            subscribe(topic, (msg) => {
                const payload = JSON.parse(msg.payloadString);
                data.developers = payload.developers;
                data.projects = payload.projects;
                resolve();
            });
            publish(
                topic,
                JSON.stringify(initialData)
            );
        });
    });

    const loadDevelopers = callback => {
        init.then(() => callback(data.developers));
    };

    const loadProjects = callback => {
        init.then(() => callback(data.projects));
    };

    return { loadDevelopers, loadProjects };
};
