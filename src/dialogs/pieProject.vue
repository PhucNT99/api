<template>
    <div style="height: 100%">
        <div class="title">
            Project
        </div>
        <div class="dialog">
            <div class="">
                <div class="new-name">
                    <label >Name</label>
                    <div class="name-input">
                        <input type="text" v-model="project.name">
                    </div>
                </div>
                <div>
                    <div class="new-name">
                        <label >Description</label>
                        <div class="name-input">
                            <input type="text" v-model="project.description">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="cancel" @click="cancel(false); close();">Cancel</div>
            <div class="submit" @click="proceed(project); close();">Oke</div>
        </div>
    </div>
</template>

<script>
import DialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'
export default {
    mixins: [DialogMixin],
    data() {
        return {
            project: {
                name: "New Project",
                description: "",
            }
        }
    },
    mounted() {
        this.project = this.options.data.project || this.project
    }
}
</script>
<style scoped>
.dg-main-content{
    max-width: 500px!important;
    max-height: 400px;
    position: relative;
}
.dialog {
    width: 100%;
    height: 70%;
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
.footer {
    display: flex;
    align-items: center;
    flex-basis: 50px;
    justify-content: flex-end;
    font-weight: bold;
    padding: 20px;
}
.footer div {
    margin: 0 10px;
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
.item-select {
    cursor: pointer;
}
.item-select:hover {
    background-color: #3f84ff24!important;
    border-color: #3f84ff24;
    -webkit-box-shadow: 0 0 0 4px #3f84ff1f;
    box-shadow: 0 0 0 4px #3f84ff1f;
}
.new-name {
    display: flex;
    align-items: center;
    margin: 10px 0  ;
}
.new-name label {
    width: 85px;
}
.create-button {
    font-weight: bold !important;
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
    margin-right: 5px;
}

</style>