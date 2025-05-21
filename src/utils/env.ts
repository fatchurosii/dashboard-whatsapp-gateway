export const env = (env: string, defaultValue: string | number | null = '') => {
    let _env = env;

    if (_env) {
        if (import.meta.env[_env]) {
            return import.meta.env[_env];
        } else {
            return defaultValue;
        }
    } else {
        return defaultValue;
    }
}