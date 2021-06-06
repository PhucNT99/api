<template>
    <div class="dialog" >
        <div class="title">
            Api 
        </div>
        <div class="dialog-inline">
            <div class="dialog-main">
                <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;"> 
                    Api informations
                </div>
                <div class="block" style="display: flex;flex: 1;flex-wrap: wrap;">
                    <div class="dialog-item ">
                        <label>Name</label>
                        <div>
                            <input type="text" v-model="api.name">
                        </div>
                    </div>
                    <div class="dialog-item ">
                        <label>Description</label>
                        <div>
                            <input type="text" v-model="api.data.description">
                        </div>
                    </div>
                    <div class="dialog-item ">
                        <label>File Path</label>
                        <div>
                            <input type="text" v-model="api.data.filePath">
                        </div>
                    </div>
                    <div class="dialog-item ">
                        <label>Method</label>
                        <div>
                            <input type="text" v-model="api.data.method">
                        </div>
                    </div>
                    <div class="dialog-item ">
                        <label>Path</label>
                        <div>
                            <input type="text" v-model="api.data.path">
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div style="display: flex;">
                        <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                            Parameters
                        </div>
                        <div class="submit" style="width: 200px!important" @click="onAddParameter()">Add Parameter</div>
                    </div>
                    <div>
                        <div class="table-headers">
                            <div class="table-col">
                                Name
                            </div>
                            <div class="table-col">
                                Description
                            </div>
                            <div class="table-col">
                                In
                            </div>
                            <div class="table-col">
                                Type
                            </div>
                            <div class="table-col">
                                Required
                            </div>
                            <div class="table-col table-remove">
                                Remove
                            </div>
                        </div>
                        <div class="table-content">
                            <div class="table-row table-add">
                                <div class="table-col">
                                    <input type="text" v-model="pName">
                                </div>
                                 <div class="table-col">
                                    <input type="text" v-model="pDescription">
                                </div>
                                <div class="table-col">
                                    <select name="" v-model="pIn">
                                        <option value="body">body</option>
                                        <option value="path">path</option>
                                        <option value="query">query</option>
                                    </select>
                                </div>
                                <div class="table-col">
                                    <input type="text" v-model="pType">
                                </div>
                                <div class="table-col">
                                    <input style="margin: auto!important" type="checkbox" v-model="pRequired">
                                </div>
                                <div class="table-col table-remove">

                                </div>
                            </div>
                            <div class="table-row" v-for="(p, _index) in api.data.parameters" :key="_index">
                                <div class="table-col">
                                    <input type="text" v-model="p.name">
                                </div>
                                <div class="table-col">
                                    <input type="text" v-model="p.description">
                                </div>
                                <div class="table-col">
                                    <select name="" v-model="p.in">
                                        <option value="body">body</option>
                                        <option value="path">path</option>
                                        <option value="query">query</option>
                                    </select>
                                </div>
                                <div class="table-col">
                                    <input type="text" v-model="p.type">
                                </div>
                                <div class="table-col">
                                    <input style="margin: auto!important" type="checkbox" v-model="p.required">
                                </div>
                                <div class="table-col table-remove" @click="removeParameter(_index)">
                                    X
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div style="display: flex;">
                        <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                            Responses
                        </div>
                        <div class="submit" style="width: 200px!important" @click="onAddResponse()">Add response</div>
                    </div>
                    <div>
                        <div class="table-headers">
                            <div class="table-col">
                                Code
                            </div>
                            <div class="table-col">
                                Message
                            </div>
                            <div class="table-col">
                                Description
                            </div>
                            <div class="table-col table-remove">
                                Remove
                            </div>
                        </div>
                        <div class="table-content">
                            <div class="table-row table-add">
                                <div class="table-col">
                                    <input type="text" v-model="rCode">
                                </div>
                                <div class="table-col">
                                    <input type="text" v-model="rMessage">
                                </div>
                                <div class="table-col">
                                    <input type="text" v-model="rDescription">
                                </div>
                                <div class="table-col table-remove">
                                    
                                </div>
                            </div>
                            <div class="table-row" v-for="(r, _index) in api.data.responses" :key="_index">
                                <div class="table-col">
                                    <input type="text" v-model="r.code">
                                </div>
                                <div class="table-col">
                                    <input type="text" v-model="r.message">
                                </div>
                                <div class="table-col">
                                    <input type="text" v-model="r.description">
                                </div>
                                <div class="table-col table-remove"  @click="removeResponse(_index)">
                                    X
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="cancel" @click="cancel(false); close();">Cancel</div>
                <div class="submit" @click="proceed(api); close();">Oke</div>
            </div>
        </div>
    </div>
</template>

<script>
import DialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'
export default {
    mixins: [DialogMixin],
    data() {
        return {
            api: {
                name: "New Api",
                description: "",
                data: {
                    filePath: "",
                    description: "",
                    method: "",
                    path: "",
                    parameters: [],
                    responses: []
                }
            },
            real: {},
            rMessage: "",
            rCode: "",
            rDescription: "",
            pName: "",
            pDescription: "",
            pIn: "",
            pType: "",
            pRequired: true,
        }
    },
    mounted() {
        let tmp = JSON.parse( JSON.stringify(this.options.data.api || this.api))
        this.api = tmp || this.api
    },
    methods: {
        onAddParameter() {
            this.api.data.parameters.push({
                name: this.pName,
                description: this.pDescription,
                in: this.pIn,
                type: this.pType,
                required: this.pRequired
            })
        },
        onAddResponse() {
            this.api.data.responses.push({
                code: this.rCode,
                message: this.rMessage,
                description: this.rDescription
            })
        },
        removeParameter(index) {
            this.api.data.parameters.splice(index, 1)
        },
        removeResponse(index) {
            this.api.data.responses.splice(index, 1)
        }
    }
}
</script>
<style scoped>
.dialog {
    max-width: 500px!important;
    max-height: 400px;
    position: relative;
        top: -100%;
    right: 10%;
    height: 600px;
    width: 80%;
    position: absolute;
    max-width: none!important;
    max-height: none!important;
    /* overflow: scroll; */
}
.footer {
    display: flex;
    align-items: center;
    flex-basis: 50px;
    justify-content: flex-end;
    font-weight: bold;
    padding: 20px 30%;
    position: fixed;
    width: 100%;
    height: 30px;
    top: 90%;
    right: 0;
}
.footer div {
    margin: 0 20px;
}
.cancel {
    width: 100% !important;
    font-weight: bold;
    background-color: #f3f3f4;
    height: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    border-radius: 10px;
    color: #9e9ea7;
    user-select: none;
    transition: all ease-in 0.1s;
}
.cancel:hover {
    cursor: pointer;
    background-color: rgb(63 133 255 / 10%);
    color: #3f84ff;
    transition: all ease-in 0.1s;
}
.submit {
    font-weight: bold !important;
    width: 100% !important;
    min-width: 100px;
    background-color: #3f84ff;
    height: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    border: transparent;
    border-radius: 10px;
    color: #fff;
    user-select: none;
    transition: all ease-in 0.1s;
    cursor: pointer;
}
.submit:hover {
    background-color: #2f6fdf;
    border-color: #3f84ff;
    -webkit-box-shadow: 0 0 0 4px #3f84ff1f;
    box-shadow: 0 0 0 4px #3f84ff1f;
}
.active {
    transition: all ease-in-out 0.2s;
    background-color: #165eda24!important;
}
.dialog-inline {
    position: relative;
    width: 100%;
    overflow: scroll;
    height: 80%;
    padding: 0 32px;
}
.title {
    color: var(--text-primary-color);
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
    user-select: none;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
}

.dialog-item {
  display: flex;
  align-items: center;
  margin: 10px 0  ;
  width: 50%;
}
.dialog-item label {
  width: 85px;
  font-weight: bold!important;
}
.float-left {
    width: 50%;
    float: left;
}
.dialog-main {
    width: 100%;
    height: 100%;
}
.table-row {
    display: flex;
    /* flex: 1; */
    align-items: center;
    justify-content: space-around;
}
.table-headers {
    display: flex;
    font-weight: bold;
    justify-content: space-around;
    text-align: center;
}
.table-col {
    /* flex-basis: 20%; */
    padding: 0 16px;
    margin-bottom: 8px;
    width: 100%;
}
.table-add {
    background: #9e9ea7;
    border-radius: 10px;
    padding-top: 8px;
    align-items: center;
    margin-bottom: 10px;
}
.block {
    margin-bottom: 32px;
    border-bottom: 1.5px solid rgb(0 0 0 / 35%);
}
.table-remove {
    text-align: center;
    flex-basis: 50%;
    cursor: pointer;
}
</style>
