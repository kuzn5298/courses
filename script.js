const jsonUrl =
  'https://raw.githubusercontent.com/kuzn5298/courses/main/courses.json';

async function loadProjects() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();

    const projectList = document.getElementById('project-list');
    const projects = data.map((course) => course.projects).flat();

    projects.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'card';

      const image = document.createElement('img');
      const mainBranch = project.branches?.[0];
      console.log(mainBranch);
      const src = `https://raw.githubusercontent.com/kuzn5298/courses/refs/heads/${mainBranch.name}/preview.png`;
      image.src = src;
      image.alt = project.name;

      const cardContent = document.createElement('div');
      cardContent.className = 'card-content';

      const title = document.createElement('h2');
      title.className = 'card-title';
      title.textContent = project.name;

      const link = document.createElement('a');
      link.className = 'card-link';
      link.href = project.url;
      link.textContent = 'View Project';
      link.target = '_blank';

      cardContent.appendChild(title);
      cardContent.appendChild(link);
      card.appendChild(image);
      card.appendChild(cardContent);
      projectList.appendChild(card);
    });
  } catch (error) {
    console.error('Fetch error', error);
  }
}

loadProjects();
