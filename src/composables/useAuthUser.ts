import { User } from "@api/auth/types";
import { ref } from "vue";
import { AuthService } from "@api/auth/service";

export function useLogin() {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const user = ref<any>(null);
    const login = async ({ username, password }: User) => {
        try {
            loading.value = true;
            const response = await AuthService.login({ username, password });
            user.value = response;
            if (response.token) {
                const avatarUrl = `https://api.dicebear.com/9.x/bottts/svg`

                localStorage.setItem('token', response.token);
                localStorage.setItem('avatarUrl', avatarUrl)
                localStorage.setItem('username', username)
            }
        } catch (err) {
            error.value = (err as Error).message || 'Failed to login';
        } finally {
            loading.value = false;
        }
    };
    return {
        error,
        loading,
        user,
        login,
    };
}
export function useRegister() {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const user = ref<any>(null);
    const register = async ({ username, password }: User) => {
        try {
            loading.value = true;
            const response = await AuthService.registerUser({ username, password });
            user.value = response;
        } catch (err) {
            error.value = (err as Error).message || 'Failed to register user';
        } finally {
            loading.value = false;
        }
    };
    return {
        error,
        loading,
        user,
        register,
    };
}