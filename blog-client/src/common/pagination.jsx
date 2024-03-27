import axios from "axios";

export const paginationData = async ({
  new_arr = false,
  arr,
  data,
  page,
  countPage,
  data_to_send = {},
}) => {
  let obj;
  if (arr != null && !new_arr) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    await axios
      .get("http://localhost:3000/" + countPage, data_to_send)
      .then(({ data: { totalData } }) => {
        obj = { results: data, page: 1, totalData };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return obj;
};
