<template>
  <div>
    <h1>{{this.id ? '编辑' : '新增'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章标题">
        <el-input v-model="model.title" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="model.category">
          <el-option
            v-for="item in articleTags.children"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      articleTags: {}
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      if (this.id) {
        await this.$http.put("rest/articles/" + this.id, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/articles/list");
    },
    async fetchTags() {
      const res = await this.$http.get("rest/articles/parent-options");
      this.articleTags = res.data;
    },
    async fetch() {
      const res = await this.$http.get("rest/articles/" + this.id);
      this.model = res.data;
    }
  },
  created() {
    this.fetchTags();
    this.id && this.fetch();
  }
};
</script>