import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUploader from "./ImageUploader";

// 尚未有圖片
test("ImageUploader has no imageSrc prop", async () => {
  // URL is no yet implemented in jest-dom
  window.URL.createObjectURL = jest.fn();
  window.URL.createObjectURL.mockReturnValue("mockedsrc");

  // button should have aria-label `select` when no image is selected
  render(<ImageUploader></ImageUploader>);
  const selectButton = screen.getByRole("button", { name: "select" });
  expect(selectButton).toBeInTheDocument();

  // should not display preview img
  const emptyPreview = screen.getByTestId("empty-preview");
  expect(emptyPreview).toBeInTheDocument();

  // user selects a file
  const fileInput = screen.getByLabelText("File Upload");
  const file = new File(["hello"], "hello.png", { type: "image/png" });

  userEvent.upload(fileInput, file);
  expect(fileInput.files[0]).toStrictEqual(file);

  // preview img should show up after file is selected
  const previewImg = await screen.findByAltText("preview-img");
  expect(previewImg).toBeInTheDocument();

  // render upload button
  const uploadButton = screen.getByRole("button", { name: "upload" });
  expect(uploadButton).toBeInTheDocument();

  userEvent.click(uploadButton);

  // if img is uploaded, show delete button
  const deleteButton = await screen.findByRole("button", { name: "delete" });
  expect(deleteButton).toBeInTheDocument();
});

// 已經有圖片
test("ImageUploader has `imageSrc` prop", async () => {
  render(<ImageUploader imageSrc="somepic.png"></ImageUploader>);

  // display preview img
  const previewImg = await screen.findByAltText("preview-img");
  expect(previewImg).toBeInTheDocument();

  // display delete button
  const deleteButton = await screen.findByRole("button", { name: "delete" });
  expect(deleteButton).toBeInTheDocument();

  // delete uploaded img from db
  userEvent.click(deleteButton);

  // show no preview img
  const emptyPreview = await screen.findByTestId("empty-preview");
  expect(emptyPreview).toBeInTheDocument();

  // show `select` button
  const selectButton = screen.getByRole("button", { name: "select" });
  expect(selectButton).toBeInTheDocument();
});
