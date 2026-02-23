import { httpService } from "../services/httpservices";
import errHandle from "../handleError/errorHandling.ts";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
const state = {


}

const actions = {

    async getFileUpload({}: any, payload: any) {
        await httpService.getFileUpload(payload).then(
            (response) => {
                if(response.status == 200 && response.data.status =="Ok"){
                }else{
                    notify({
                        group: "auth",
                        type: "error",
                        title: response.data.message,
                    });
                }
            },
            (error) => {
                errHandle.methods.errorHandle(error);
            }
        ).finally(() => {});
    },

    async getFileSubmit({ }: any) {
        await httpService.getFileSubmit().then((response) => {
            if(response.status == 200 && response.data.status =="Ok"){
                notify({
                    group: "auth",
                    type: "success",
                    title: `File uploaded successfully`,
                  });
            }else{
                notify({
                    group: "auth",
                    type: "error",
                    title: response.data.message,
                  });
            }

        },
            (error) => {
                errHandle.methods.errorHandle(error);
        }).finally(() => {});
    },

}

const mutations = {

}

const getters = {

}
const fileupload = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
};
export default fileupload;