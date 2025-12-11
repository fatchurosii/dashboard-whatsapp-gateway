<template>
    <div class="d-flex flex-column flex-root" id="kt_app_root" style="min-height:100vh">
        <div class="d-flex flex-column flex-lg-row flex-column-fluid">
            <div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
                <div class="d-flex flex-center flex-column flex-lg-row-fluid">
                    <div class="w-lg-500px p-10">
                        <form @submit.prevent="login" class="form w-100">
                            <div class="text-center mb-11">
                                <h1 class="text-gray-900 fw-bolder mb-3">Sign In</h1>
                                <div class="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div>
                            </div>
                            <div class="separator separator-content my-14">
                                <span class="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
                            </div>
                            <div class="fv-row mb-8">
                                <input v-model="form.username" type="text" placeholder="Username" name="email"
                                    autocomplete="off" class="form-control bg-transparent" />
                                <div v-if="v$.username.$error" class="text-danger">{{ v$.username.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="fv-row mb-3">
                                <input v-model="form.password" type="password" placeholder="Password" name="password"
                                    autocomplete="off" class="form-control bg-transparent" />
                                <div v-if="v$.password.$error" class="text-danger">{{ v$.password.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="d-grid mb-10">
                                <button type="submit" :disabled="pageStatus == 'form-login'" id="kt_sign_in_submit" class="btn btn-primary">
                                    <span class="indicator-label">Sign In</span>                                
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
                style="background-image: url('/assets/media/misc/auth-bg.png')">
                <div class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
                    <a href="index.html" class="mb-0 mb-lg-12">
                        <img alt="Logo" src="/assets/media/logos/custom-1.png" class="h-60px h-lg-75px">
                    </a>
                    <img class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
                        src="/assets/media/misc/auth-screens.png" alt="">
                    <h1 class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7">Fast, Efficient and
                        Productive</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        useAuthorizationStore
    } from "@stores/authorization";
    import {
        reactive, ref, onMounted
    } from "vue";
    import useVuelidate from "@vuelidate/core";
    import {
        required,
        minLength
    } from "@vuelidate/validators";
    import { AxiosResponse } from "axios";
    import {useRouter} from "vue-router";    
    import {handleErrorApi, initMetronicPlugin} from '@plugins/global';

    const router = useRouter();

    const authorizationStore = useAuthorizationStore();

    const form = reactive({
        username: "" as string,
        password: "" as string,
    });

    const pageStatus = ref<string>('');

    const rules = {
        username: {
            required
        },
        password: {
            required,
            minLength: minLength(6)
        },
    };

    const v$ = useVuelidate(rules, form);    
    onMounted(() => {
        initMetronicPlugin();
    });

    async function login() {
        try {
            if(pageStatus.value === 'form-login') return;

            v$.value.$touch();
            if (v$.value.$invalid) return;
            pageStatus.value = 'form-login';
            
            let response = await authorizationStore.login(form) as AxiosResponse;
            
            if(response && response.status === 200){
                router.replace('/');
            }
        } catch (error) {
            handleErrorApi(error, false);
        } finally {
            pageStatus.value = '';
        }            
    }
</script>