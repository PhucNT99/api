<template>
  <div class="top-area">
        <div class="item">
            <div class="item-name" @click="onNewProject">
                New Project
            </div>
        <!-- </div>
        <div class="item"> -->
            <div class="item-name" @click="onOpenProject">
                Open Project
            </div>
        <!-- </div>
        <div class="item"> -->
            <div class="item-name" @click="onUpdateProject">
                Edit Project
            </div>
        <!-- </div>
        <div class="item"> -->
            <div class="item-name" @click="onDeleteProject">
                Delete project
            </div>
        <!-- </div>
        <div class="item"> -->
            <div class="item-name" @click="generateDocs">
                Gen docs
            </div>
        <!-- </div>
        <div class="item"> -->
            <div class="item-name" @click="generateTestCases">
                Gen test
            </div>
            <div class="item-name" v-if="currentProject && currentProject.id">
                <a :href="'docs/' + currentProject.id + '/_book'" target="_blank">Docs</a>
            </div>
        <!-- </div> -->
        <!-- <div class="item"> -->
            <div class="item-name" >
                <b>{{ currentProject ? currentProject.name : "Empty"}}</b>
            </div>
        </div>
  </div>
</template>

<script>

export default {
    name: "TopNav",
    props: {
        currentProject: {
            type: Object
        },
        onNewProject: {
            type: Function
        },
        onOpenProject: {
            type: Function
        },
        onUpdateProject: {
            type: Function
        },
        onDeleteProject: {
            type: Function
        },
        generateDocs: {
            type: Function
        },
        generateTestCases: {
            type: Function
        },
    },
    mounted() {
        console.log(this.currentProject)
    },
    methods: {

    }
}
</script>

<style scoped lang="less">
.top-area {
  display: flex;
  flex-shrink: inherit;
  width: 100%;
}
.inputSmall {
  width: 80px !important;
}
.item-name {
  text-transform: uppercase;
  min-width: 18px;
  height: 18px;
  min-height: 18px;
  margin: 0 15px 0 20px;
  transition: all ease-in-out 0.2s;
  box-shadow: 0 0 0 10px #fff;
  background: #fff;
  cursor: pointer;
  &:hover {
    color: #0573c7;
    opacity: 1;
    box-shadow: 0 0 0 10px #0573c715;
    background: #0573c715;
    border-radius: 1px;
    transition: all ease-in-out 0.2s;
  }
}
.item {
  display: flex;
  width: 100%   ;
  align-items: center;
  border-bottom: 1px solid #eee;
//   padding-bottom: 15px;
//   margin: 0 -20px 15px -20px;
  height: 60px;
  & > div > div {
    display: flex;
    position: relative;
    & > *:nth-child(1) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      margin: 0;
      opacity: 0.5;
    }
    & > *:nth-child(3) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      margin: 0;
      opacity: 0.5;
    }
  }
}
.item-icon {
  width: 18px;
  min-width: 18px;
  height: 18px;
  min-height: 18px;
  margin: 0 15px 0 20px;
  transition: all ease-in-out 0.2s;
  box-shadow: 0 0 0 10px #fff;
  background: #fff;
  cursor: pointer;
  &.option {
    opacity: 0.5;
    margin-left: 15px;
  }
  &:hover {
    color: #0573c7;
    opacity: 1;
    box-shadow: 0 0 0 10px #0573c715;
    background: #0573c715;
    border-radius: 1px;
    transition: all ease-in-out 0.2s;
  }
}

</style>
