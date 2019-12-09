 <template>
  <div>
    <h1>{{this.id ? '编辑' : '新增'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password" style="width:300px"></el-input>
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
      model: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put("rest/adminUsers/" + this.id, this.model);
      } else {
        await this.$http.post("rest/adminUsers", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/adminUsers/list");
    },
    async fetch() {
      const res = await this.$http.get("rest/adminUsers/" + this.id);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>