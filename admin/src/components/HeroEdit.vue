<template>
  <div>
    <h1>{{this.id ? '编辑' : '新增'}}英雄</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-tabs value="first">
        <el-tab-pane label="英雄详情" name="first">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="头像上传">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => this.$set(model,'avater',res.url)"
            >
              <img v-if="model.avater" :src="model.avater" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄定位">
            <el-select v-model="model.tag" multiple placeholder="请选择">
              <el-option
                v-for="item in heroTags.children"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能编辑" name="second">
          <el-button size="small" icon="el-icon-plus" @click="model.skills.push({})">添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.cd"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.describe" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公式化" name="third">
          <h1>敬请期待...</h1>
        </el-tab-pane>
      </el-tabs>
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
        skills: []
      },
      heroTags: {}
    };
  },
  methods: {
    // 发送请求保存数据
    async save() {
      if (this.id) {
        await this.$http.put("rest/heroes/" + this.id, this.model);
      } else {
        await this.$http.post("rest/heroes", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/heroes/list");
    },
    async fetch() {
      const res = await this.$http.get("rest/heroes/" + this.id);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchTags() {
      const res = await this.$http.get("rest/heroes/parent-options");
      this.heroTags = res.data;
    }
  },
  created() {
    this.fetchTags();
    this.id && this.fetch();
  }
};
</script>

<style>
</style>

  