<template>
    <!--begin::Container-->
    <div id="kt_content_container">
        <div class="card card-flush" id="kt_profile_details_view">
            <div class="card card-xl-stretch">
                <div class="card-header border-0 pt-5 align-items-center">
                    <h3 class="card-title align-items-start flex-column">
                        <span class="card-label fw-bolder text-dark mb-2 fs-1">Master User</span>
                        <span class="text-muted fs-6">Kelola Data Master User</span>
                    </h3>
                </div>
                <div class="card-body pt-5">
                    <DataTable :config="userStore.table" @get-data="userStore.getData"
                        @set-order="(order: string) => userStore.setOrder(order)"
                        @set-page="(page: number) => userStore.setCurrentPage(page)"
                        @set-search="(search: string) => userStore.setSearch(search)"
                        @set-show-per-page="(showPerPage: number) => userStore.setShowPerPage(showPerPage)"
                        @set-sort-by="(sortBy: string) => userStore.setSortBy(sortBy)"
                        :is-from-store="true">
                        <template v-slot:body>
                            <tr v-for="(context, index) in userStore.table.data">
                                <td class="text-center">
                                    {{ index + ((Number(userStore.table.showPerPage) *
                                        (Number(userStore.table.currentPage) - 1))) + 1 }}
                                </td>
                                <td class="text-left">{{ context.username }}</td>
                                <td class="text-left">{{ context.createdAt }}</td>
                                <td class="text-left">{{ context.updatedAt }}</td>
                                <td class="text-center">
                                    <div class="dropdown" style="position:static">
                                        <a class="btn btn-sm btn-secondary dropdown-toggle" href="#"
                                            role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Aksi
                                        </a>

                                        <ul class="dropdown-menu dropdown-menu-end w-200px p-3"
                                            aria-labelledby="dropdownMenuLink">

                                            <!-- <li>
                                                <button class="dropdown-item p-2"
                                                    @click="edit(context?.id)">
                                                    <span class="svg-icon svg-icon-primary svg-icon-1 me-1">
                                                        <EditIcon />
                                                    </span>
                                                    Edit
                                                </button>
                                            </li> -->
                                            <!-- <li>
                                                <button class="dropdown-item p-2"
                                                    @click="confirmResetPassword(context?.id)">
                                                    <span class="svg-icon svg-icon-warning svg-icon-1 me-1">
                                                        <ResetPasswordIcon />
                                                    </span>
                                                    Reset Password
                                                </button>
                                            </li> -->
                                            <!-- <li>
                                                <button class="dropdown-item p-2"
                                                    @click="deleteData(context?.id)">
                                                    <span class="svg-icon svg-icon-danger svg-icon-1 me-1">
                                                        <TrashIcon />
                                                    </span>
                                                    Hapus Data
                                                </button>
                                            </li> -->
                                        </ul>
                                    </div>

                                </td>
                            </tr>
                        </template>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
    <!--end::Container-->
</template>

<script setup lang="ts">
  import {onMounted} from 'vue';
  import {initMetronicPlugin} from '@plugins/global';
  import { useUserStore } from '@src/stores/user';
  import { DataTable } from '@src/components/main';
  
  const userStore = useUserStore();
  console.log(userStore.getData())
  
  onMounted(() => {
    initMetronicPlugin();
  });
</script>