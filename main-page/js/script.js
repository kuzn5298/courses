import { createCard } from './card.js';
import { getProjects } from './projects.js';

const loadProject = async () => {
  const projectList = document.getElementById('project-list');
  const projects = await getProjects();

  projects.forEach(async (project) => {
    const card = await createCard(project);
    projectList.appendChild(card);
  });
};

loadProject();
