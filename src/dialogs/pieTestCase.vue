<template>
    <div class="dialog">
        <div class="title">
            Test Case
        </div>
        <div class="dialog-inline">
            <div class="dialog-main">
                <div style="display: flex;">
                    <div class="dialog-item" style="flex: 1">
                        <label>Test</label>
                        <div>
                            <input type="text" v-model="testCase.name">
                        </div>
                    </div>
                    <div class="dialog-item" style="width: auto">
                        <div style="width: 200px!important;margin: auto;" class="submit" @click="onAddCase">
                            Add case
                        </div>
                    </div>
                </div>
                <div v-for="(t, index) in testCase.data" :key="index">
                    <div class="block" style="display: flex;">
                        <div class="dialog-item" style="flex: 1">
                            <label>Case</label>
                            <div>
                                <input type="text" v-model="t.name">
                            </div>
                        </div>
                        <div class="dialog-item" style="width: auto">
                            <div class="submit" @click="toggle(index)">
                                {{ toggleObj[index] ? "Show" : "Hide" }}
                            </div>
                        </div>
                    </div>
                    <div class="block" v-show="!toggleObj[index]">
                        <div style="display: flex;">
                            <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                                Parameters
                            </div>
                            <div class="submit" style="width: 200px!important" @click="onAddParam(t)">Add</div>
                        </div>
                        <div>
                            <div class="table-headers">
                                <div class="table-col">
                                    Name
                                </div>
                                <div class="table-col">
                                    Value
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
                                        <input type="text" v-model="pValue">
                                    </div>
                                    <div class="table-col table-remove">

                                    </div>
                                </div>
                                <div class="table-row" v-for="(p, _index) in t.parameters" :key="_index">
                                    <div class="table-col">
                                        <input type="text" v-model="p.name">
                                    </div>
                                    <div class="table-col">
                                        <input type="text" v-model="p.value">
                                    </div>
                                    <div class="table-col table-remove" @click="onDeleteP(t, p)">
                                        X
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block" v-show="!toggleObj[index]">
                        <div style="display: flex;">
                            <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                                Expects
                            </div>
                            <div class="submit" style="width: 200px!important" @click="onAddExpect(t)">Add</div>
                        </div>
                        <div>
                            <div class="table-headers">
                                <div class="table-col">
                                    Code
                                </div>
                                <div class="table-col">
                                    Response
                                </div>
                                <div class="table-col">
                                    Condition
                                </div>
                                <div class="table-col table-remove">
                                    Remove
                                </div>
                            </div>
                            <div class="table-content">
                                <div class="table-row table-add">
                                    <div class="table-col">
                                        <input type="text" v-model="eCode">
                                    </div>
                                    <div class="table-col">
                                        <input type="text" v-model="eResponse">
                                    </div>
                                    <div class="table-col">
                                        <input type="text" v-model="eCondition">
                                    </div>
                                    <div class="table-col table-remove">

                                    </div>
                                </div>
                                <div class="table-row" v-for="(e, _index) in t.expect" :key="_index">
                                    <div class="table-col">
                                        <input type="text" v-model="e.code">
                                    </div>
                                    <div class="table-col">
                                        <input type="text" v-model="e.response">
                                    </div>
                                    <div class="table-col">
                                        <input type="text" v-model="e.condition">
                                    </div>
                                    <div class="table-col table-remove" @click="onDeleteE(t, e)">
                                        X
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="cancel" @click="cancel(false); close();">Cancel</div>
            <div class="submit" @click="proceed(testCase); close();">Oke</div>
        </div>
    </div>
</template>

<script>
import DialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'
export default {
    mixins: [DialogMixin],
    data() {
        return {
            testCase: {
                name: "New Test Case",
                data: []
            },
            pName: "",
            pValue: "",
            eCode: "",
            eResponse: "",
            eCondition: "",
            toggleObj: {}
        }
    },
    mounted() {
        let tmp = JSON.parse( JSON.stringify(this.options.data.testCase || this.testCase))
        this.testCase = tmp || this.testCase
    },
    methods: {
        onAddCase() {
            this.testCase.data.push({
                name: "New case",
                parameters: [],
                expect: []
            })
        },
        onAddParam(t) {
            t.parameters.push({
                name: this.pName,
                value: this.pValue
            })
        },
        onAddExpect(t) {
            t.expect.push({
                code: this.eCode,
                response: this.eResponse,
                condition: this.eCondition
            })
        },
        onDeleteP(t, v) {
            t.parameters.splice(t.parameters.indexOf(v), 1)

        },
        onDeleteE(t, v) {
            t.expect.splice(t.expect.indexOf(v), 1)
        },
        toggle(index) {
            let tmp = Object.assign({}, this.toggleObj)
            tmp[index] = !tmp[index]
            this.toggleObj = tmp
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