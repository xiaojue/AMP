<template>
  <m-main-con>
    <m-top>
      <p class="title">{{id === 'new' ? '新建项目' : '修改项目'}}</p>
    </m-top>
    <m-middle>
      <div class="detail">
        <div class="item">
          <p class="title">1 项目名称</p>
          <div class="main_form">
            <span class="iconfont">&#xe600;</span>
            <input type="text" placeholder="请输入项目名称" v-model="projectDetail.name"></input>
          </div>
        </div>
        <div class="item">
          <p class="title">2 项目描述</p>
          <div class="main_form">
            <textarea maxlength="200" placeholder="请输入项目描述" v-model="projectDetail.desc">{{projectDetail.desc}}</textarea>
            <div class="char_num">{{projectDetail.desc | length}}/200</div>
          </div>
        </div>
        <div class="item">
          <p class="title">3 创建人</p>
          <div class="main_form">
            <input type="text" disabled="disabled" v-model="projectDetail.name"></input>
          </div>
        </div>
        <div class="item">
          <p class="title">4 创建时间</p>
          <div class="main_form">
            <input type="text" disabled="disabled" v-model="projectDetail.name"></input>
          </div>
        </div>
        <div class="item">
          <p class="title">5 成员</p>
          <div class="main_form">
            <input type="text" placeholder="请输入邮箱进行查询" v-model="memberQuery"></input>
            <ul class="member_query_list">
              <li v-for="item in memberQueryResult">{{item.emil}}</li>
            </ul>
            <div class="memer_list">
              <div class="member_item" v-for="item in projectDetail.member">
                <span>{{item.email}}</span>
                <a href="javascript:void(0)" class="iconfont">&#xe609;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m-middle>
    <m-bottom>
      <div class="btn_con">
        <a href="javascript:void(0)" class="btn btn_success" @click="save()">保存</a>
        <a href="javascript:void(0)" class="btn btn_default" @click="cancel()">取消</a>
      </div>
    </m-bottom>
  </m-main-con>
</template>

<script>
  
import store from 'store';
import actions from 'actions';

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

export default {
  name: 'ProjectEdit',
  data() {
    return {
      id: null,
      projectDetail: {
        // name: '',
        // desc: '',
        // creator: '',
        // createTime: '',
        // member: []
      },
      memberQuery: '',
      memberQueryResult: [],
      canQuit: false
    }
  },
  vuex: {
    getters: {
      isLogin: () => {
        return store.state.isLogin;
      }
    },
    actions: actions
  },
  components: {
    'm-main-con': con_main,
    'm-top': con_top,
    'm-middle': con_middle,
    'm-bottom': con_bottom
  },
  created() {
    const _this = this;
    this.$route.router.beforeEach((transition) => {
      if(!this.canQuit){
        transition.abort();
        actions.confirm(store, {
          show: true,
          msg: '是否放弃修改？',
          apply() {
            _this.canQuit = true;
            _this.$route.router.go(transition.to.path);
          }
        });
        return;
      }else{
        transition.next();
      }
    })
  },
  methods: {
    save() {
      if(this.inputCheck()){
        return;
      }
      this.$http({
        url: '/api/collection' + (this.id === 'new' ? '' : '?id=' + this.id),
        method: this.id === 'new' ? 'post' : 'put',
        data: {
          name: this.projectDetail.name
        }
      }).then((res) => {
        if(this.isLogin){
          const resData = res.data;
          actions.alert(store, {
            show: true,
            type: 'success',
            msg: this.id === 'new' ? '新建成功' : '修改成功'
          })
          this.id === 'new' ? this.$route.router.go('/main/project/detail/' + resData.data.id) : null;
        }
      })
    },
    cancel() {
      if(this.id === 'new'){
        this.$route.router.go('/main/project/list/mine');
      }else{
        this.$route.router.go('/main/project/detail/' + this.projectDetail.id);
      }
    },
    inputCheck() {
      // 错误检查
      if(this.projectDetail.name === '' || !this.projectDetail.name){
        actions.alert(store, {
          show: true,
          msg: '输入信息有误，请检查',
          type: 'danger'
        })
        return true;
      }
    }
  },
  route: {
    data(transtion) {
      this.id = transtion.to.params.id;
      if(this.id !== 'new'){
        actions.loading(store, true);
        this.$http({
          url: '/api/collection',
          method: 'get',
          data: {
            id: this.id
          }
        }).then((res) => {
          if(this.isLogin){
            const resData = res.data;
            this.projectDetail = resData.data[0];
            actions.loading(store, false);
          }
        })
      }
    }
  }
}

</script>
