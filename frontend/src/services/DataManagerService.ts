import { ApiInstance, APIRoutes, BASE_URL } from './common';

const uploadData = async (formData: FormData) => {
    try {
        const res = await ApiInstance.post(
            `${BASE_URL}${APIRoutes.UPLOAD_DATA}`,
            formData,
            {
                headers: { 'content-type': 'multipart/form-data' }, //overide default content type
            }
        );
        return { data: res.data, status: res.status };
    } catch (error: any) {
        return { data: error.response.data.detail, status: 400 };
    }
};
export const DataManagerService = { uploadData };
