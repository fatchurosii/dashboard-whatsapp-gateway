import { defineStore } from "pinia";
import { UserDataTable, User } from "@src/types/user";
import { reactive } from "vue";
import api from "@services/api";
import { handleErrorApi } from "@src/plugins/global";

export const useUserStore = defineStore("user", () => {
  const table = reactive<UserDataTable>({
    column: [
      { text: "NO", sortBy: "id", sortColumn: true },
      {
        text: "Username",
        sortBy: "username",
        sortColumn: true,
        class: "w-300px",
      },
      {
        text: "Created At",
        sortBy: "id",
        sortColumn: false,
        class: "text-left",
      },
      {
        text: "Update At",
        sortBy: "id",
        sortColumn: false,
        class: "text-left",
      },
      { text: "Aksi", sortBy: "", sortColumn: false, class: "text-center" },
    ],
    data: [],
    showPerPage: 10,
    search: "",
    order: "asc",
    sortBy: "id",
    totalData: 0,
    currentPage: 1,
    loading: false,
    showSearch: true,
  });

  function setShowPerPage(perPage: number) {
    table.showPerPage = perPage;
  }
  function setCurrentPage(page: number) {
    table.currentPage = page;
  }

  function setLoading(loading: boolean) {
    table.loading = loading;
  }

  function setSearch(value: string) {
    table.search = value;
  }

  function setData(data: User[]) {
    table.data = data;
  }

  function setOrder(order: string) {
    table.order = order;
  }

  function setSortBy(sort: string) {
    table.sortBy = sort;
  }

  function setTotalData(total: number) {
    table.totalData = total;
  }

  function resetTable() {
    setCurrentPage(1);
    setShowPerPage(10);
    setSearch("");
    setTotalData(0);
    setOrder("asc");
    setSortBy("id");
  }

  async function getData() {
    setLoading(true);
    try {
      const params = {
        page: table.currentPage,
        limit: table.showPerPage,
        orderBy: table.order,
        sortBy: table.sortBy,
        search: table.search,
      };
      const res = await api().get(`api/users`, { params });
      const response = res?.data;
      setData(response.data)
      setTotalData(response?.meta?.total  || 0);
      
      return res;
    } catch (err) {
      setData([]);
      setTotalData(0);
      handleErrorApi(err);
      return err;
    } finally {
      setLoading(false);
    }
  }
  return {
    table,
    setShowPerPage,
    setCurrentPage,
    setLoading,
    setSearch,
    setData,
    setOrder,
    setSortBy,
    setTotalData,
    resetTable,
    getData,
  };
});
