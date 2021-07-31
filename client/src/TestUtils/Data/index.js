// response data
export const testSuccessLoginResponse = {
  succeed: true,
  message: "login succeeded",
};

export const testFailLoginResponse = {
  succeed: false,
  message: "authentication failed",
};

export const testSuccessLogoutResponse = {
  succeed: true,
  message: "logout succeeded",
};

export const testSuccessImageUploadResponse = {
  _id: "60eadfe09eef676b88102d61",
};

export const testSuccessDeleteImageResponse = {
  message: "deleted",
};

export const profileResponse = {
  _id: "60c6190ab53322bb583b7205",
  description: "rita is here!",
  nickname: "Rita",
  skills: [
    {
      _id: "60c6190b2213a24e78b02141",
      name: "React",
      description: "Intermediate",
      imgPath: "60c6190b2213a24e78b02141", // image id in mongo
    },
  ],
  socialLinks: [
    {
      _id: "60c6190b2213a24e78b02140",
      name: "facebook",
      description: "my facebook page",
      imgPath: "60c6190b2213a24e78b02141", // image id in mongo
      link: "https://facebook.com",
    },
  ],
};

export const demoResponse = [
  {
    _id: "60f43c7fcb66304ed0d48083",
    name: "A react project",
    githubLink: "https://sfsdfsdf.com",
    demoLink: "httos://wrwerwerrwe.com",
    description: "a simple react project",
    tags: ["react", "redux", "sass"],
    __v: 0,
  },
];

export const createdDemoResponse = {
  _id: "60f43c7fcb66304ed0d88888",
  name: "New react project",
  githubLink: "https://sfsdfsdf.com",
  demoLink: "httos://wrwerwerrwe.com",
  description: "a simple react project",
  tags: ["react", "redux", "sass"],
  __v: 0,
};

export const editedDemoResponse = {
  _id: "60f43c7fcb66304ed0d48083",
  name: "Edited react project",
  githubLink: "https://sfsdfsdf.com",
  demoLink: "httos://wrwerwerrwe.com",
  description: "a simple react project",
  tags: ["react", "redux", "sass"],
  __v: 0,
};

export const expListResponse = [
  {
    _id: "60fd6f25b384bf400cfb7b49",
    title: "frontend",
    company: "could be anywhere",
    startDate: "2020-06-08T00:00:00.000Z",
    endDate: "2021-07-05T00:00:00.000Z",
    description: "do some front end stuff",
    __v: 0,
  },
];

export const editedExpResponse = {
  _id: "60fd6f25b384bf400cfb7b49",
  title: "A Great Procrastinator",
  company: "A place called Slaughter race",
  startDate: "2020-06-08T00:00:00.000Z",
  endDate: "2021-07-05T00:00:00.000Z",
  description: "What can it be that calls me to this place today?",
  __v: 0,
};

export const createExpResponse = {
  _id: "60fd6f25b384bf400cf77777",
  title: "cat lover",
  company: "Kitty Paradise",
  startDate: "2020-06-08T00:00:00.000Z",
  endDate: "2021-07-05T00:00:00.000Z",
  description: "Big Kitty, Come to Mommy",
  __v: 0,
};
