import userEvents from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import ImageUploader from "../ImageUploader";
import userEvent from "@testing-library/user-event";

test("error-free image upload flow", async () => {
  global.URL.createObjectURL = jest.fn();
  global.URL.createObjectURL.mockReturnValue("mocked-image-src");
  render(<ImageUploader></ImageUploader>);

  // before any image is selected, show select
  const fileInput = screen.getByTestId("file-uploader");
  const selectButton = screen.getByLabelText("select image");
  expect(selectButton).toBeInTheDocument();
  const imageFile = new File(["hello"], "hello.png", { type: "image/png" });
  userEvent.upload(fileInput, imageFile);

  // after a image is selected, show preview img
  const previewImg = await screen.findByAltText("preview-img");
  expect(previewImg).toBeInTheDocument();

  // select button changes into upload button
  const selectButtonAfterSelected = screen.queryByLabelText("select image");
  const uploadButton = screen.getByLabelText("upload image");
  expect(uploadButton).toBeInTheDocument();
  expect(selectButtonAfterSelected).toBe(null);

  // click upload button to upload, upload button changes into delete button after upload succeeds
  userEvent.click(uploadButton);

  await waitFor(() => {
    const deleteButton = screen.getByLabelText("delete image");
    expect(deleteButton).toBeInTheDocument();
  });
  const uploadButtonAfterUploaded = screen.queryByLabelText("upload image");
  expect(uploadButtonAfterUploaded).toBe(null);

  // delete image
  const deleteButton = screen.getByLabelText("delete image");
  userEvent.click(deleteButton);

  // do not show preview image, delete button changes into select
  await waitFor(() => {
    const previewImageAfterDeleted = screen.queryByAltText("preview-img");
    const selectButton = screen.getByLabelText("select image");
    const deleteButtonAfterDeleted = screen.queryByLabelText("delete image");
    expect(selectButton).toBeInTheDocument();
    expect(previewImageAfterDeleted).toBe(null);
    expect(deleteButtonAfterDeleted).toBe(null);
  });
});
