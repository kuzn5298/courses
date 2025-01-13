const getExternalLinkSvg = async () =>
  (await fetch('icons/external-link.svg')).text();
const getBookSvg = async () => (await fetch('icons/book.svg')).text();
const getGitHubSvg = async () => (await fetch('icons/github.svg')).text();
const getRightIconSvg = async () =>
  (await fetch('icons/right-arrow.svg')).text();

const goToUrl = (url) => {
  window.open(url, '_blank');
};

const createIconButton = (icon, action) => {
  const button = document.createElement('button');
  button.className = 'icon';
  button.onclick = action;
  button.innerHTML = icon;
  button.addEventListener('click', (event) => event.stopPropagation());

  return button;
};

const createImageBlock = async (project) => {
  const imageBlock = document.createElement('div');
  imageBlock.className = 'image';

  const img = document.createElement('img');
  img.src = project.preview;
  img.alt = project.name;
  imageBlock.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  imageBlock.appendChild(overlay);

  const description = document.createElement('p');
  description.textContent = project.description;

  if (project.skills?.length) {
    const skills = await createSkillsBlock(project);
    description.appendChild(skills);
  }

  overlay.appendChild(description);

  const actions = document.createElement('div');
  actions.className = 'actions';
  overlay.appendChild(actions);

  const githubButton = createIconButton(await getGitHubSvg(), () =>
    goToUrl(project.github)
  );
  const courseButton = createIconButton(await getExternalLinkSvg(), () =>
    goToUrl(project.course.url)
  );
  actions.appendChild(githubButton);
  actions.appendChild(courseButton);

  return imageBlock;
};

const createContentBlock = async (project) => {
  const cardBlock = document.createElement('div');
  cardBlock.className = 'content';

  const title = document.createElement('p');
  title.className = 'title';
  title.textContent = project.name;
  cardBlock.appendChild(title);

  const course = document.createElement('p');
  course.className = 'course';
  course.textContent = project.course.name;
  cardBlock.appendChild(course);

  const arrowIcon = document.createElement('span');
  arrowIcon.className = 'arrow';
  arrowIcon.innerHTML = await getRightIconSvg();
  cardBlock.appendChild(arrowIcon);

  return cardBlock;
};

const createTagsBlock = (project) => {
  const tagsBlock = document.createElement('div');
  tagsBlock.className = 'tags';

  project.tags.forEach((tag) => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    tagsBlock.appendChild(tagElement);
  });

  return tagsBlock;
};

const createSkillsBlock = async (project) => {
  const skillsBlock = document.createElement('div');
  skillsBlock.className = 'skills';
  const skillButton = createIconButton(await getBookSvg());
  skillsBlock.appendChild(skillButton);

  const skillsContent = document.createElement('div');
  skillsContent.className = 'skills-content';
  const skillsList = document.createElement('ul');

  project.skills.forEach((skill) => {
    const skillElement = document.createElement('li');
    const skillText = document.createElement('span');
    skillText.textContent = skill;
    skillElement.appendChild(skillText);
    skillsList.appendChild(skillElement);
  });

  skillsContent.appendChild(skillsList);
  skillsBlock.appendChild(skillsContent);

  return skillsBlock;
};

export const createCard = async (project) => {
  const card = document.createElement('article');
  card.className = 'card';

  const imageBlock = await createImageBlock(project);
  card.appendChild(imageBlock);

  const contentBlock = await createContentBlock(project);
  card.appendChild(contentBlock);

  const tagsBlock = createTagsBlock(project);
  card.appendChild(tagsBlock);

  card.addEventListener('click', () => {
    window.open(project.url, '_blank');
  });

  return card;
};
