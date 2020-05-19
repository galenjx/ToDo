<template>
  <div class="container">
    <header>
      <h1>我的待办</h1>
    </header>

    <section>
      <ul>
        <li v-for="(item,i) in lists" :key="item.content">
          <el-divider></el-divider>
          <div class="content">
            <el-checkbox v-model="item.checked" @change="update()">{{item.content}}</el-checkbox>
            <i class="el-icon-delete" @click="dodelete(i)"></i>
          </div>
        </li>
      </ul>
    </section>
    <el-divider></el-divider>
    <footer>
      <div class="content">
        <el-input v-model="input" placeholder="添加我的待办" @keyup.enter="add()"></el-input>
        <el-button type="primary" @click="add()" size="mini">添加</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {


  data() {
    return {
      //输入的信息
      input: "",
      //待办列表
      lists: []
    };
  },


  created() {
    //拿出存储的待办列表
    this.lists = JSON.parse(localStorage.getItem("lists")) || [];
  },


  methods: {
    //删除
    dodelete(i) {
      //确认框
      this.$confirm("此操作将永久删除该待办事项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.lists.splice(i, 1);
          //存入本地
          localStorage.setItem("lists", JSON.stringify(this.lists));
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加
    add() {
      //不能为空
      if (this.input == "") {
        return this.$message("待办事项不能为空");
      }
      //看看是否有相同的事件
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].content == this.input) {
          return this.$message("已有该待办事项");
        }
      }
      //单个事件的结构
      let list = {
        checked: false,
        content: this.input
      };
      //存储待办
      this.lists.push(list);
      localStorage.setItem("lists", JSON.stringify(this.lists));
      this.input = "";
      //  提示成功
      this.$message({
        message: "添加待办成功",
        type: "success"
      });
    },

    //更新
    update(){
      localStorage.setItem("lists", JSON.stringify(this.lists))
    }
  },



};
</script>


<style lang="less" >
ul,
li {
  margin: 0;
  padding: 0;
}

//响应式容器
.container {
  background-color: #fff;
  width: 100%;
  padding: 1rem;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}


//事件列表
ul {
  list-style: none;
  vertical-align: bottom;
  .content {
    display: flex;
    justify-content: space-between;
    i:hover {
      color: red;
      cursor: pointer;
    }
  }
}
//input

footer {
  .content {
    display: flex;
    justify-content: space-between;
    .el-button {
      margin-left: 1rem;
    }
  }
}

//重置element-ui样式
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #919499;
  text-decoration: line-through;
}
.el-checkbox {
  color: #000;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #000;
  border-color: #dcdee1;
}
</style>
