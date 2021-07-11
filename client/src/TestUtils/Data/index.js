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
