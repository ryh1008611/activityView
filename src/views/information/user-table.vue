<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入用户姓名" style="width: 200px;" class="filter-item ml-10" />
      <el-select class="filter-item  ml-10">
        <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.value" />
      </el-select>
      <!-- 是否已关联 -->
      <el-button class="filter-item  ml-10" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item  ml-10" type="plain" icon="el-icon-refresh">
        重置
      </el-button>
    </div>
    <el-table
      :data="ActivityInfo"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" align="center">
        <template slot-scope="{row}">
          <el-tag v-for="(item, index) in row.roles" :key="'tag_' + index">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" align="center">
        <template slot-scope="{row}">
          <div>
            <el-switch
              v-model="row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="0"
              :inactive-value="1"
              active-text="在线"
              inactive-text="禁用"
              @change="setUserState(row)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="row">
          <el-button type="primary" size="mini" @click="dialogRole = true;userId = row.row.id;dialogState = true">
            设置权限
          </el-button>
          <el-button type="primary" size="mini" @click="dialogInformation = true;userInfo = ActivityInfo[row.$index]">
            个人信息
          </el-button>
          <el-button type="primary" size="mini">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 弹窗 -->
    <el-dialog title="权限信息" :visible.sync="dialogRole">
      <role-list v-if="dialogState" :user-id="userId" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRole = false;dialogState = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
    <!-- 个人信息 -->
    <el-dialog title="个人信息" :visible.sync="dialogInformation">
      <el-form ref="userInfo" :model="userInfo" label-width="80px">
        <el-form-item label="登录账号">
          <el-input v-model="userInfo.username" disabled="true" />
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="userInfo.name" disabled="true" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="userInfo.phone" disabled="true" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="userInfo.email" disabled="true" />
        </el-form-item>
        <el-form-item label="入学年份">
          <el-input v-model="userInfo.classNum" disabled="true" />
        </el-form-item>
        <el-form-item label="学院名称">
          <el-input v-model="userInfo.academy" disabled="true" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="userInfo.major" disabled="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInformation = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./js/user-table.js"></script>
<style>
.ml-10{
  margin-left: 10px;
}
</style>
