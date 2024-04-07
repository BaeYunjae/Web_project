const express = require("express");
const { pool } = require("./db");

const app = express();
const PORT = 8080;

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());
app.use("/public", express.static("public"));

const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "public/");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const fileNameExeptExt = path.basename(file.originalname, ext);
      const saveFileName = fileNameExeptExt + Date.now() + ext;
      done(null, saveFileName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// api
// 전체 메뉴 가져오기
app.get("/api/menus", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM menus LIMIT 10");
    return res.json(data[0]);
  } catch (error) {
    // console.error(error);
    return res.json({
      success: false,
      message: "전체 메뉴 목록 조회에 실패하였습니다.",
    });
  }
});

// 전체 주문 가져오기
app.get("/api/orders", async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT a.id, quantity, request_detail, name, description, image_src 
      FROM orders as a 
      INNER JOIN menus as b 
      ON a.menus_id = b.id 
      ORDER BY a.id DESC`
    );
    return res.json(data[0]);
  } catch (error) {
    return res.json({
      success: false,
      message: "전체 주문 목록 조회에 실패하였습니다.",
    });
  }
});

// 메뉴 id 가져오기 -> 프론트 개발자한테 일일이 인덱스 접근하라 안 해도 됨
app.get("/api/menus/:id", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM menus WHERE id = ?", [
      req.params.id,
    ]);
    return res.json(data[0][0]);
  } catch (error) {
    return res.json({
      success: false,
      message: "메뉴 조회에 실패하였습니다.",
    });
  }
});

// 주문 id 가져오기
app.get("/api/orders/:id", async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT a.id, quantity, request_detail, name, description, image_src 
      FROM orders as a 
      INNER JOIN menus as b 
      ON a.menus_id = b.id 
      WHERE a.id = ?`,
      [req.params.id]
    );
    return res.json(data[0][0]);
  } catch (error) {
    return res.json({
      success: false,
      message: "주문 조회에 실패하였습니다.",
    });
  }
});

// 메뉴 추가하기 - id는 생성할 때 신경 안 씀
app.post("/api/menus/", upload.single("file"), async (req, res) => {
  try {
    const data = await pool.query(
      "INSERT INTO menus (name, description, image_src) VALUES (?, ?, ?)",
      [req.body.name, req.body.description, req.file.path]
    );
    return res.json({
      success: true,
      message: "메뉴 등록에 성공하였습니다.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "메뉴 등록에 실패하였습니다.",
    });
  }
});

// 주문 추가하기, form-data 추가는 미들웨어 upload.single("file") 추가 필요
app.post("/api/orders", async (req, res) => {
  try {
    const data = await pool.query(
      "INSERT INTO orders (quantity, request_detail, menus_id) VALUES (?, ?, ?)",
      [req.body.quantity, req.body.request_detail, req.body.menus_id]
    );

    return res.json({
      success: true,
      message: "주문에 성공하였습니다.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "주문에 실패하였습니다.",
    });
  }
});

// 파일 및 이미지 수정
app.post("/api/menus/:id/image", upload.single("file"), async (req, res) => {
  try {
    const data = await pool.query(
      "UPDATE menus SET image_src = ? WHERE id = ?",
      [req.file.path, req.params.id]
    );

    return res.json({
      success: true,
      message: "메뉴 이미지 수정에 성공하였습니다.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "메뉴 이미지 수정에 실패하였습니다.",
    });
  }
});

// 메뉴 수정하기
app.patch("/api/menus/:id", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const data = await pool.query(
      "UPDATE menus SET name = ?, description = ? WHERE id = ?",
      [req.body.name, req.body.description, req.params.id]
    );
    return res.json({
      success: true,
      message: "메뉴 정보 수정에 성공하였습니다.",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "메뉴 정보 수정에 실패하였습니다.",
    });
  }
});

// 주문 수정하기
app.patch("/api/orders/:id", async (req, res) => {
  try {
    const data = await pool.query(
      "UPDATE orders SET quantity = ?, request_detail = ?, menus_id = ? WHERE id = ?",
      [
        req.body.quantity,
        req.body.request_detail,
        req.body.menus_id,
        req.params.id,
      ]
    );
    return res.json({
      success: true,
      message: "주문 정보 수정에 성공하였습니다.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "주문 정보 수정에 실패하였습니다.",
    });
  }
});

// 메뉴 삭제하기
app.delete("/api/menus/:id", async (req, res) => {
  try {
    const data = await pool.query("DELETE FROM menus WHERE id = ?", [
      req.params.id,
    ]);
    return res.json({
      success: true,
      message: "메뉴 삭제에 성공하였습니다.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "메뉴 삭제에 실패하였습니다.",
    });
  }
});

// 주문 삭제하기
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const data = await pool.query("DELETE FROM orders WHERE id = ?", [
      req.params.id,
    ]);
    return res.json({
      success: true,
      message: "주문 삭제에 성공하였습니다.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "주문 삭제에 실패하였습니다.",
    });
  }
});

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));
