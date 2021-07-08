import {
  render,
  screen,
} from "../../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import LinkGroup from "../LinkGroup";
import App from "../../../../../App";

const socialLinks = [
  {
    _id: "60c6190b2213a24e78b02140",
    name: "facebook",
    description: "my facebook page",
    imgPath: "60c61bdc86da40077406a7a1",
    link: "https://sfsfsfds.com",
  },
];

test("renders correct number of linkitem if has prop", () => {
  render(<LinkGroup links={socialLinks}></LinkGroup>);

  const linkItem = screen.getAllByRole("listitem");
  expect(linkItem.length).toBe(1);
});

test("render no link item if has no prop", () => {
  render(<LinkGroup></LinkGroup>);

  const linkItem = screen.queryByRole("listitem");
  expect(linkItem).toBe(null);
});

test("add link", async () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.createObjectURL.mockReturnValue("mockedsrc");

  const link = {
    name: "facebook",
    link: "facebook.com",
    description: "my facebook page",
    img: new File(["hello"], "hello.png", { type: "image/png" }),
  };
  render(<App></App>, { initialState: { auth: true } });

  const imgInput = screen.getByLabelText("File Upload");

  userEvent.upload(imgInput, link.img);

  // make sure img is uploaded
  const previewImg = await screen.findByAltText("preview-img");
  expect(previewImg).toBeInTheDocument();
  const uploadButton = await screen.findByRole("button", { name: "upload" });
  userEvent.click(uploadButton);

  // if img is uploaded, show delete button
  const deleteButton = await screen.findByRole("button", { name: "delete" });
  expect(deleteButton).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText("名稱");
  userEvent.type(nameInput, link.name);

  const linkInput = screen.getByPlaceholderText("連結");
  userEvent.type(linkInput, link.link);

  const descriptionInput = screen.getByPlaceholderText("說明");
  userEvent.type(descriptionInput, link.description);

  const submitButton = screen.getByRole("button", { name: "add link" });
  expect(nameInput.value).toBe(link.name);
  userEvent.click(submitButton);

  screen.debug();
  // reducer updated
  // render(<LinkGroup links={[link]}></LinkGroup>);

  // const listItem = await screen.findAllByRole("listitem");
  // expect(listItem.length).toBe(1);
  // expect(listItem[0]).toHaveTextContent(link.name);
});
