<template>
  <div>
      <top-nav :current-project="currentProject" :on-new-project="onNewProject" :on-open-project="onOpenProject" :on-update-project="onUpdateProject" :on-delete-project="onDeleteProject" :generate-docs="generateDocs" :generate-test-cases="generateTestCases"/>
      <main-layout :current-project="currentProject" :on-create-api="onCreateApi" :on-update-api="onUpdateApi" :on-delete-api="onDeleteApi" :onCreateTestCase="onCreateTestCase" :onUpdateTestCase="onUpdateTestCase" :onDeleteTestCase="onDeleteTestCase" />
  </div>
</template>

<script>
import Vue from 'vue'
import ApiServices from "../services/ApiServices"
import * as utils from "../services/utils"
import { TopNav, MainLayout } from "./index"
export default {
  components: { TopNav, MainLayout },
  name: 'Screen',
  data() {
    return {
      currentProject: null
    }
  },
  props: {
  },
  created() {
        this.dialog = Vue.dialog
  },
  mounted() {
    if(!this.currentProject) {
      this.onOpenProject()
    }
  },
  methods: {
    onNewProject() {
      this.dialog.alert("", {
        view: "Project",
        data: {}
      })
      .then(result => {
        let data = result.data
        console.log(data)
        ApiServices.createProject(data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        
      })
      .catch(result => {
        console.log(result)
      })
    },
    onOpenProject() {
      this.dialog.alert("", {
        view: "OpenProject",
        data: { currentProject: this.currentProject, setProject: this.setProject }
      })
      .then(({ data }) => {
        console.log(data)
        this.currentProject = utils.parseJson(data)
      })
      .catch(result => {
        console.log(result)
      })
    },
    onUpdateProject() {
      this.dialog.alert("", {
        view: "Project",
        data: {
          project: this.currentProject
        }
      })
      .then(result => {
        let data = result.data
        console.log(data)
        ApiServices.updateProject(data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        
      })
      .catch(result => {
        console.log(result)
      })
    },
    onDeleteProject() {
      if(!this.currentProject) {
        console.log("No")
        return
      }
      this.dialog.alert("", {
        view: "Confirm",
        data: {
          message: "You want to delete this project?"
        }
      })
      .then(({ data }) => {
        if(data) {
          ApiServices.deleteProject({id: this.currentProject.id})
          .then(res => {
            console.log(res)
            this.currentProject = null
          })
          .catch(err => {
            console.log(err)
          })
        }
        console.log(data)        
      })
      .catch(result => {
        console.log(result)
      })
    },
    setProject(project) {
      this.currentProject = project
    },
    onCreateApi() {
      this.dialog.alert("", {
        view: "Api",
        data: {}
      })
      .then(({ data }) => {
        data.idProject = this.currentProject.id
        data.data = JSON.stringify(data.data)
        return ApiServices.createApi(data)
      })
      .then(res => {
        let api = res.content
        api.data = JSON.parse(api.data)
        this.currentProject.Apis.push(api)
      })
      .catch(result => {
        console.log(result)
      })
    },
    onUpdateApi(api, id) {
      console.log(api, id)
      this.dialog.alert("", {
        view: "Api",
        data: { api }
      })
      .then(({ data }) => {
        console.log(data)
        let _data = Object.assign({}, data)
        _data.data = JSON.stringify(data.data)
        return ApiServices.updateApi(_data)
      })
      .then(res => {
        console.log(res)
      })
      .catch(result => {
        console.log(result)
      })
    },
    onDeleteApi(api, id) {
      this.dialog.alert("", {
        view: "Confirm",
        data: {
          message: "You want to delete this api?"
        }
      })
      .then(({ data }) => {
        console.log(data, api, id)
        if(data) {
          return ApiServices.deleteApi({id})
        }
      })
      .then(res => {
        // console.log(this.currentProject.Apis.indexOf(api))
        this.currentProject.Apis.splice(this.currentProject.Apis.indexOf(api), 1)
      })
      .catch(result => {
        console.log(result)
      })
    },
    onCreateTestCase(api) {
      this.dialog.alert("", {
        view: "TestCase",
        data: {
          
        }
      })
      .then(({data}) => {
        console.log(data)
        data.idApi = api.id
        data.data = JSON.stringify(data.data)
        ApiServices.createTestCase(data)
        .then(res => {
          console.log(res)
          res.content.data = JSON.parse(res.content.data)
          api.Tests.push(res.content)
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    onUpdateTestCase(testCase) {
      console.log(testCase)
      this.dialog.alert("", {
        view: "TestCase",
        data: {
          testCase: testCase
        }
      })
      .then(({data}) => {
        let _data = Object.assign({}, data)
        _data.data = JSON.stringify(data.data)
        ApiServices.updateTestCase(_data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })

    },
    onDeleteTestCase(api, testCase) {
      console.log(testCase)
      ApiServices.deleteTestCase({id: testCase.id})
      .then(res => {
        api.Tests.splice(api.Tests.indexOf(testCase))
      })
      .catch(err => {
        console.log(err)
      })
    },
    generateDocs() {
      ApiServices.downloadFile("/api/gen/gen-doc", {
        id: this.currentProject.id
      })
      .then(res => {
        let a = document.createElement("a")
        document.body.appendChild(a)
        a.style = "display: none"
        let blob = new Blob([res.data],{type: "application/zip"})
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `${this.currentProject.name || "docs"}.zip`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.log(err)
      })
    },
    generateTestCases() {
      ApiServices.httpPost("/api/gen/gen-test", {
        id: this.currentProject.id
      })
      .then(res => {
        console.log(res)
        let data = JSON.stringify(res.content, null, 4)
        let a = document.createElement("a")
        document.body.appendChild(a)
        a.style = "display: none"
        let blob = new Blob([data],{type: "text/plain"})
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `${this.currentProject.name || "test-case"}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
}
function str2bytes (str) {
   var bytes = new Uint8Array(str.length);
   for (var i=0; i<str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

</script>

<style scoped>
</style>
