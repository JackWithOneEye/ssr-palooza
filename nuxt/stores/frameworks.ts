export const useFrameworksStore = defineStore('frameworksStore', () => {
    const getFrameworks = useFetch('/api/frameworks', { immediate: false, lazy: true });
    const loadingFrameworks = computed(() => getFrameworks.pending.value);
    const frameworks = computed(() => getFrameworks.data.value ?? []);

    async function fetchFrameworks() {
        await getFrameworks.execute()
        return true;
    }

    return { frameworks, fetchFrameworks, loadingFrameworks };
});