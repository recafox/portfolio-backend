import {
  render,
  screen,
} from "../../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import LinkInput from "../LinkInput";

test("Link input starts out empty", () => {
  render(<LinkInput></LinkInput>);

  // name input should be empty
  const nameInput = screen.getByPlaceholderText("名稱");
  expect(nameInput.value).toBe("");

  // link input should be empty
  const linkInput = screen.getByPlaceholderText("連結");
  expect(linkInput.value).toBe("");
});

describe("handles error", () => {
  let submitButton;
  beforeEach(() => {
    render(<LinkInput></LinkInput>);
    submitButton = screen.getByRole("button", { name: "add link" });
  });

  it("Shows error if user submit without filling `name`", () => {
    const nameInput = screen.getByPlaceholderText("名稱");
    userEvent.clear(nameInput);
    userEvent.click(submitButton);

    expect(nameInput).toHaveClass("is--error");
  });

  it("shows error if user submit without filling `link`", () => {
    const linkInput = screen.getByPlaceholderText("連結");
    userEvent.clear(linkInput);
    userEvent.click(submitButton);

    expect(linkInput).toHaveClass("is--error");
  });

  it("shows error if user submit without filling `description`", () => {
    const descriptionInput = screen.getByPlaceholderText("說明");
    userEvent.clear(descriptionInput);
    userEvent.click(submitButton);

    expect(descriptionInput).toHaveClass("is--error");
  });

  test("error should disappear when user types in the input", () => {
    const linkInput = screen.getByPlaceholderText("連結");
    userEvent.clear(linkInput);
    userEvent.click(submitButton);

    userEvent.type(linkInput, "a link");
    expect(linkInput).not.toHaveClass("is--error");
  });
});

test("should clean all the values after submit", async () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.createObjectURL.mockReturnValue("mockedsrc");

  render(<LinkInput></LinkInput>);
  const nameInput = screen.getByPlaceholderText("名稱");
  userEvent.clear(nameInput);
  userEvent.type(nameInput, "facebook");

  const linkInput = screen.getByPlaceholderText("連結");
  userEvent.clear(linkInput);
  userEvent.type(linkInput, "facebook.com");

  const descriptionInput = screen.getByPlaceholderText("說明");
  userEvent.clear(descriptionInput);
  userEvent.type(descriptionInput, "臉書");

  // image is optional
  const imgInput = screen.getByLabelText("File Upload");
  const img = new File(["hello"], "hello.png", { type: "image/png" });

  userEvent.upload(imgInput, img);
  expect(imgInput.files[0]).toStrictEqual(img);
  const uploadButton = await screen.findByRole("button", { name: "upload" });
  userEvent.click(uploadButton);

  // make sure img is uploaded
  const deleteButton = await screen.findByRole("button", { name: "delete" });
  expect(deleteButton).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: "add link" });
  userEvent.click(submitButton);

  expect(nameInput.value).toBe("");
  expect(linkInput.value).toBe("");
  expect(descriptionInput.value).toBe("");
  const emptyPreview = await screen.findByTestId("empty-preview");
  expect(emptyPreview).toBeInTheDocument();
});
