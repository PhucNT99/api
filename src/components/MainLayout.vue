<template>
  <div class="main">
    <div v-if="currentProject && currentProject.Apis" style="overflow: scroll">
      <div class="" style="display: flex">
        <div class="" style="flex: 1">
          <div style="font-size: 30px">
            {{ currentProject.name }}
          </div>
          <div>
            {{ currentProject.description }}
          </div>
        </div>
        <div class="submit" @click="onCreateApi">
          Add API
        </div>
      </div>
      <div class="item-api" v-for="api in currentProject.Apis" :key="api.id" style="margin: 30px;" >
        <div class="api-name">
          {{ api.name}}
        </div>
        <div class="api-description">
          {{ api.description }}
        </div>
        <div class="api-action">
          <div class="submit" @click="onUpdateApi(api, api.id)">Edit</div>
          <div class="submit" @click="onDeleteApi(api, api.id)">Delete</div>
          <div class="submit" @click="onCreateTestCase(api)">Add test case</div>
          <div class="submit" @click="toggle('api', api.id)">
            {{ toggleApiObj[api.id] ? "Show" : "Hide" }}
          </div>
        </div>
        <div v-show="!toggleApiObj[api.id]">            
          <div class="api-info">
            <div class="item-api-info">
              <label>FilePath: </label>
              <div class="">
                <input type="text" disabled v-model="api.data.filePath">
              </div>
            </div>
            <div class="item-api-info">
              <label>Description:</label>
              <div class="">
                <input type="text" disabled v-model="api.data.description">
              </div>
            </div>
            <div class="item-api-info">
              <label>Method:</label>
              <div class="">
                <input type="text" disabled v-model="api.data.method">
              </div>
            </div>
            <div class="item-api-info">
              <label>Path:</label>
              <div class="">
                <input type="text" disabled v-model="api.data.path">
              </div>
            </div>
            <div style="display: flex;">
                <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                    Parameters
                </div>
                <div class="submit" style="width: 200px!important" @click="toggle('param', api.id)">
                  {{ !togglePObj[api.id] ? "Show" : "Hide" }}
                </div>
            </div>
            <div class="api-info-parameters" v-show="togglePObj[api.id]">
              <div class="block">
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
                        </div>
                        <div class="table-content">
                            <div class="table-row" v-for="(p, _index) in api.data.parameters" :key="_index">
                                <div class="table-col">
                                    <input disabled type="text" v-model="p.name">
                                </div>
                                <div class="table-col">
                                    <input disabled type="text" v-model="p.description">
                                </div>
                                <div class="table-col">
                                    <select disabled name="" v-model="p.in">
                                        <option value="body">body</option>
                                        <option value="path">path</option>
                                        <option value="query">query</option>
                                    </select>
                                </div>
                                <div class="table-col">
                                    <input disabled type="text" v-model="p.type">
                                </div>
                                <div class="table-col">
                                    <input disabled style="margin: auto!important" type="checkbox" v-model="p.required">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;">
                <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                    Responses
                </div>
                <div class="submit" style="width: 200px!important" @click="toggle('res', api.id)">
                  {{ !toggleRObj[api.id] ? "Show" : "Hide" }}
                </div>
            </div>
            <div class="api-info-responses" v-show="toggleRObj[api.id]">
              <div class="block">
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
                        </div>
                        <div class="table-content">
                            <div class="table-row" v-for="(r, _index) in api.data.responses" :key="_index">
                                <div class="table-col">
                                    <input disabled type="text" v-model="r.code">
                                </div>
                                <div class="table-col">
                                    <input disabled type="text" v-model="r.message">
                                </div>
                                <div class="table-col">
                                    <input disabled type="text" v-model="r.description">
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div v-if="api.Tests">
            <div style="display: flex;">
                <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                    Test Case
                </div>
                <div class="submit" style="width: 200px!important" @click="toggle('test_case', api.id)">
                  {{ !toggleTObj[api.id] ? "Show" : "Hide" }}
                </div>
            </div>
            <div class="" v-show="toggleTObj[api.id]" v-for="testCase in api.Tests" :key="testCase.id">
               <div class="dialog-item" style="flex: 1">
                  <label>Test</label>
                  <div>
                      <input type="text" v-model="testCase.name">
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
                        <div class="submit" @click="onUpdateTestCase(testCase)">
                          Edit
                        </div>
                        <div class="submit" @click="onDeleteTestCase(api, testCase)">
                          Delete
                        </div>
                    </div>
                    <div class="block" >
                        <div style="display: flex;">
                            <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                                Parameters
                            </div>
                        </div>
                        <div>
                            <div class="table-headers">
                                <div class="table-col">
                                    Name
                                </div>
                                <div class="table-col">
                                    Value
                                </div>
                            </div>
                            <div class="table-content">
                                <div class="table-row" v-for="(p, _index) in t.parameters" :key="_index">
                                    <div class="table-col">
                                        <input disabled type="text" v-model="p.name">
                                    </div>
                                    <div class="table-col">
                                        <input disabled type="text" v-model="p.description">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block" >
                        <div style="display: flex;">
                            <div style="flex: 1;font-size: 16px;font-weight: bold;margin: 16px 0;">
                                Expects
                            </div>
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
                            </div>
                            <div class="table-content">
                                <div class="table-row" v-for="(e, _index) in t.expect" :key="_index">
                                    <div class="table-col">
                                        <input disabled type="text" v-model="e.code">
                                    </div>
                                    <div class="table-col">
                                        <input disabled type="text" v-model="e.response">
                                    </div>
                                    <div class="table-col">
                                        <input disabled type="text" v-model="e.condition">
                                    </div>
                                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Main",
  data() {
    return {
      toggleApiObj: {},
      togglePObj: {},
      toggleRObj: {},
      toggleTObj: {}
    }
  },
  props: {
    currentProject: {
      type: Object
    },
    onCreateApi: {
      type: Function
    },
    onUpdateApi: {
      type: Function
    },
    onDeleteApi: {
      type: Function
    },
    onCreateTestCase: {
      type: Function
    },
    onUpdateTestCase: {
      type: Function
    },
    onDeleteTestCase: {
      type: Function
    },
  },
  methods: {
    toggle(type, id) {
      if(type == 'api') {
        let tmpObj = Object.assign({}, this.toggleApiObj)
        tmpObj[id] = !tmpObj[id]
        this.toggleApiObj = tmpObj
      }
      if(type == 'param') {
        let tmpObj = Object.assign({}, this.togglePObj)
        tmpObj[id] = !tmpObj[id]
        this.togglePObj = tmpObj
      }
      if(type == 'res') {
        let tmpObj = Object.assign({}, this.toggleRObj)
        tmpObj[id] = !tmpObj[id]
        this.toggleRObj = tmpObj
      }
      if(type == 'test_case') {
        let tmpObj = Object.assign({}, this.toggleTObj)
        tmpObj[id] = !tmpObj[id]
        this.toggleTObj = tmpObj
      }
    }
  }
}
</script>

<style scoped>
.item-api {
  position: relative;
  border-bottom: 1px solid;
}
.api-name {
  font-size: 25px;
  font-weight: 500;
}
.api-description {
  margin: 10px 0px;
  font-style: oblique;
}
.api-action,.action-test {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
}


.submit {
    font-weight: bold !important;
    min-width: 100px;
    background-color: #3f84ff;
    height: 30px;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 20px;
    border: transparent;
    border-radius: 10px;
    color: #fff;
    user-select: none;
    transition: all ease-in 0.1s;
    cursor: pointer;
    margin: 0 10px;
}
.submit:hover {
    background-color: #2f6fdf;
    border-color: #3f84ff;
    -webkit-box-shadow: 0 0 0 4px #3f84ff1f;
    box-shadow: 0 0 0 4px #3f84ff1f;
}

.item-res {
  display: flex;
  align-items: center;
  margin: 10px 0  ;
}
.item-res label {
  width: 85px;
  font-weight: bold!important;
}
.item-api-info {
    display: flex;
    align-items: center;
    margin: 10px 0  ;
}
.item-api-info label {
    width: 85px;
    font-weight: bold!important;
}
.api-info-parameters {
  margin-left: 64px;
}
.api-info-responses {
  margin-left: 64px;
}

.item-param {
    display: flex;
    align-items: center;
    margin: 10px 0  ;
}
.item-param label {
    width: 85px;
    font-weight: bold!important;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.item-test {
  margin-left: 128px;
}
.title-name {
  margin-left: 128px;
  font-size: 20px;
  font-weight: bold;
}
.hidden {
  display: none;
}


/* =================== */ 
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


.dialog-item {
  display: flex;
  align-items: center;
  margin: 10px 0  ;
}
.dialog-item label {
  width: 85px;
  font-weight: bold!important;
}
</style>
