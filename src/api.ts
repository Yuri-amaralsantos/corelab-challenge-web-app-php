export const fetchTasks = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
