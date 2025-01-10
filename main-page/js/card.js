const getExternalLinkSvg = async () =>
  (await fetch('icons/external-link.svg')).text();

const getGitHubSvg = async () => (await fetch('icons/github.svg')).text();
const getRightIconSvg = async () =>
  (await fetch('icons/right-arrow.svg')).text();

const createIconButton = (icon, url) => {
  const button = document.createElement('a');
  button.className = 'icon';
  button.href = url;
  button.target = '_blank';
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
  overlay.appendChild(description);

  const actions = document.createElement('div');
  actions.className = 'actions';
  overlay.appendChild(actions);

  const githubButton = createIconButton(await getGitHubSvg(), project.github);
  const courseButton = createIconButton(
    await getExternalLinkSvg(),
    project.course.url
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
