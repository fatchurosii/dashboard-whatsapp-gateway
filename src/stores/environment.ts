import { defineStore} from 'pinia'
import {
    reactive
} from 'vue';
import {
    env
} from '@src/utils/env';

interface EnvironmentState {
    apiURL: string,
    maxFileUploadSize: number, // in MB
    defaultPassword: string,
    subDirectory: string,
}


export const useEnvironmentStore = defineStore('environment', () => {
    let data = reactive({
        apiURL: env('VITE_API_URL', 'http://127.0.0.1:8000/'),
        maxFileUploadSize: env('VITE_MAX_FILE_UPLOAD_SIZE', 10), // in MB
        defaultPassword: env('VITE_DEFAULT_PASSWORD', '123456'),
        subDirectory: env('VITE_SUBDIRECTORY', '/'),

    }) as EnvironmentState;
    return {
        data,
    };

});