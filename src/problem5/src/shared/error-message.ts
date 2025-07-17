export const ErrorMessage = {
    RESOURCE_ALREADY_EXISTS: (resource: string) => `${resource} already exists`,
    REQUIRED_FIELD: (field: string) => `${field} is required`,
    RESOURCE_NOT_FOUND: (resource: string) => `${resource} isn't found`,
};
