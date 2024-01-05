import { pepServices } from "./service/mqttService.js";
import { start } from "./pep.js";

const broker = "localhost";
const port = 8083;
const topic = "pep"

const appRootId = window.appRootId;

const service = pepServices(broker, port, topic, "/static/pep/img/");

service.loadDevelopers(devs =>
		service.loadProjects(projects => {
			start(appRootId, devs, projects)
		}
));
