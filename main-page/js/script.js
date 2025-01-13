import { createCard } from './card.js';
import { getProjects } from './projects.js';

const loadProject = async () => {
  const projectList = document.getElementById('project-list');
  const projects = await getProjects();

  const cards = await Promise.all(
    projects.map((project) => createCard(project))
  );

  cards.forEach((card) => {
    projectList.appendChild(card);
  });
};

loadProject();
