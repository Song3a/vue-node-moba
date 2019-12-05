<template>
  <div>
    <h1>装备列表</h1>
    <el-table height="70vh" :data="items" row-key="id" border>
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="装备名称"></el-table-column>
      <el-table-column prop="icon" label="装备图标"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="$router.push('/items/edit/'+ scope.row._id)">编辑</el-button>
          <el-button type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`确定要删除装备"${row.name}"吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete("rest/items/" + row._id);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>