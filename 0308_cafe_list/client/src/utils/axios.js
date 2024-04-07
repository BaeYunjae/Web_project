import axios from "axios";
const DOMAIN = "http://localhost:8080";
const request = axios.create({
  baseURL: `${DOMAIN}/api`,
});

export const api = {
  menus: {
    findAll: () => request.get("/menus"),
    findOne: (id) => request.get(`/menus/${id}`),

    create: (name, description, file) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file);

      return request.post("/menus", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    // 메뉴 수정
    update: (id, name, description) =>
      request.patch(`/menus/${id}`, {
        name: name,
        description,
      }),

    // 메뉴 이미지 수정
    updateImage: (id, file) => {
      const formData = new FormData();
      formData.append("file", file);

      return request.post(`/menus/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    // 메뉴 삭제
    delete: (id) => request.delete(`/menus/${id}`),
  },

  orders: {
    // 주문목록 조회
    findAll: () => request.get("/orders"),
    // 주문 조회
    findOne: (id) => request.get(`/orders/${id}`),
    // 주문하기
    create: (menus_id, quantity, request_detail) =>
      request.post(`/orders`, {
        menus_id,
        quantity,
        request_detail,
      }),

    // 주문 내역 수정하기
    update: (id, menus_id, quantity, request_detail) =>
      request.patch(`/orders/${id}`, {
        menus_id: menus_id,
        quantity,
        request_detail,
      }),

    // 주문내역 삭제하기
    delete: (id) => request.delete(`/orders/${id}`),
  },
};
