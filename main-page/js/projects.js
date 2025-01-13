const COURSES_URL =
  'https://raw.githubusercontent.com/kuzn5298/courses/main/courses.json';

const getCourses = async () => {
  const response = await fetch(COURSES_URL);
  const courses = await response.json();

  return courses;
};

const parseCoursesToProjects = (courses) => {
  return courses
    .map((course) =>
      course.projects?.map((project) => ({
        name: project.name,
        url: project.url,
        description: project.description,
        preview: project.preview,
        github: project.branch?.url,
        tags: project.tags,
        course: {
          name: course.name,
          url: course.url,
        },
        skills: project.skills,
      }))
    )
    .flat();
};

export const getProjects = async () => {
  const courses = await getCourses();
  const projects = parseCoursesToProjects(courses);

  return projects;
};
