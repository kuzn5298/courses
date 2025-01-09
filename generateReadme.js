const fs = require('fs');

const generateReadme = () => {
  const data = JSON.parse(fs.readFileSync('courses.json', 'utf8'));

  let readmeContent = '';
  readmeContent += `# Projects from Courses\n\n`;
  readmeContent += `This repository showcases projects completed during various courses. Each project includes links to branches with the source code and live preview.\n\n`;
  readmeContent += `## Courses and projects\n\n`;

  for (const course of data) {
    readmeContent += `### [${course.name}](${course.url})\n`;

    for (const project of course.projects) {
      readmeContent += `> **Name:** ${project.name}<br>\n`;
      readmeContent += `> **Branches:** ${project.branches
        ?.map((branch) => `[${branch.name}](${branch.url})`)
        ?.join(' | ')}<br>\n`;
      readmeContent += `> **Live Preview:** [${project.name}](${project.url})<br>\n\n`;
    }
  }

  fs.writeFileSync('README.md', readmeContent.trim());
};

generateReadme();
