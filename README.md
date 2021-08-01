# Portfolio 後台

## demo

[Portfolio Backend](https://afternoon-anchorage-74547.herokuapp.com/)
使用 heroku 部署, 第一次打開需要點時間

## 功能

- 帳號密碼登入

- 個人資料可編輯欄位(router: /profile)

  - 暱稱
  - 自我介紹
  - 連結: 可編輯名稱, 連結, 說明, 以及上傳 icon 圖檔
  - 技能: 可編輯名稱, 連結, 說明, 以及上傳 icon 圖檔

- 作品集可編輯欄位(router: /demo)

  - 名稱
  - 標籤 (作品使用的技術標籤)
  - github 位置
  - demo 位置

- 工作經歷可編輯欄位(router: /exp)
  - 職位
  - 公司
  - 開始 & 結束時間
  - 內容說明

## 使用技術

- 後端

  - Node.js & Express
  - 使用 MongoDB 做資料庫
  - [multer](https://www.npmjs.com/package/multer)處理圖片上傳
  - [passport.js](http://www.passportjs.org/)結合 cookie 處理登入, 使用 local strategy
  - router 採用 RESTFul 設計, 使用 GET, PUT, DELETE, POST
  - 部署於 Heroku

- 前端
  - React 全家桶, React, Redux, React-rotuer
  - Axios 處理 HTTP request
  - 測試採用 Jest + React Testing Library + msw (原先使用 jest + enzyme, 但後來覺得比較喜歡 RTL)
  - ESLint
  - Styled components

## Reference

後端技術及架構參考[Node with React: Fullstack Web Development](https://www.udemy.com/course/node-with-react-fullstack-web-development/)

後端架構及測試參考[Nodejs Express - unit testing/integration tests with Jest](https://www.udemy.com/course/nodejs-unit-testing-and-integration-testing-with-express-and-jest/), 但我測試並沒有寫得很完整...

前端測試參考[Testing React with Jest and Testing Library](https://www.udemy.com/course/react-testing-library/)

前端架構參考[bonniedotdev](https://github.com/bonnie/bonniedotdev)
