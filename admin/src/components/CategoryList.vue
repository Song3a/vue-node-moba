<template>
  <div>
    <h1>分类列表</h1>
    <el-table
      height="70vh"
      :data="items"
      row-key="_id"
      size="small"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="parent" label="上级分类"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="$router.push('/categories/edit/'+ scope.row._id)">编辑</el-button>
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
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
    },
    async remove(row) {
      if (!row.parent) {
        this.$alert("一级分类，请不要删除！", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        this.$confirm(`确定要删除分类"${row.name}"吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          await this.$http.delete("rest/categories/" + row._id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        });
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>