<template>
  <div>
    <h1>{{this.id ? '编辑' : '新增'}}装备</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="装备标签">
        <el-select v-model="model.tag">
          <el-option v-for="item in itemTags" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="装备名称">
        <el-input v-model="model.name" style="width:300px"></el-input>
      </el-form-item>

      <el-form-item label="图标上传">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item
        v-for="(item,index) in model.addition"
        :label="'装备属性' + (index+1)"
        :key="item.key"
      >
        <el-input v-model="model.addition.value" style="width:500px;margin-right:10px">
          <el-select slot="prepend" placeholder="请选择属性" v-model="model.addition.prop">
            <el-option
              v-for="item in itemAddition"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-input>
        <el-button type="danger" @click.prevent="removeData(item)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addData">新增属性条目</el-button>
      </el-form-item>

      <el-form-item label="装备描述">
        <el-input type="textarea" style="width:500px" :rows="8" v-model="model.describe"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        addition: [
          {
            value: 0
          }
        ]
      },
      itemTags: [],
      itemAddition: []
    };
  },
  methods: {
    addData() {
      this.model.addition.push({
        value: "",
        key: Date.now()
      });
    },
    removeData(item) {
      var index = this.model.addition.indexOf(item);
      if (index !== -1) {
        this.model.addition.splice(index, 1);
      }
    },
    async save() {
      if (this.id) {
        await this.$http.put("rest/items/" + this.id, this.model);
      } else {
        await this.$http.post("rest/items", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/items/" + this.id);
      this.model = res.data;
    },
    async fetchTags() {
      const res = await this.$http.get("rest/items/parent-options");
      this.itemTags = res.data;
    },
    async fetchProps() {
      const res = await this.$http.get("rest/items/props-options");
      this.itemAddition = res.data;
    }
  },
  created() {
    this.fetchTags();
    this.fetchProps();
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-select .el-input {
  width: 200px;
}
</style>

  