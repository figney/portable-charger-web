<template>
  <div
      class="task-card padding-tb-sm"
      style="border-bottom:1px solid #EEECFA"
  >
    <van-cell
        center
        :border="false"
        class="padding-0"
        @click="seeTaskDetail"
    >
      <template #icon>
        <div class="size-40 flex align-center justify-center van-overflow-hidden margin-right-xs" style="padding:0.055rem 0">
          <img style="height:100%" :src="task.icon">
        </div>
      </template>

      <template #title>
        <div class="flex flex-direction">
          <div class="padding-left-xs">{{task.title}}</div>
          <div
            class="margin-tb-xs border-radius-xs padding-lr-xs bg-f7f9ff"
            v-if="['ContinuousDay','Accomplish','ContinuousDayIncrease'].includes(task.task_target)"
          >
            <template v-if="task.task_target=='ContinuousDay'">
              <div class="flex align-center">
                <span class="font-bold fc-432af5">
                  <money-number
                    :value="task.user_task.ut_continuous_day || 0"
                    v-if="task.user_task"
                  />
                  <span v-else>{{ 0 }}</span>
                </span>
                <span class="margin-lr-xs font-bold">/</span>
                <money-number :value="task.continuous_day"/>
              </div>
            </template>

            <template v-else-if="task.task_target=='Accomplish'">
              <div class="flex align-center">
                <span class="font-bold fc-432af5">
                  <money-number
                      :value="Math.floor(task.user_task.target_condition)>0 ? Math.floor(task.user_task.target_condition) : 0"
                      v-if="task.user_task"
                  />
                  <span v-else>{{ 0 }}</span>
                </span>
                <span class="margin-lr-xs font-bold">/</span>
                <money-number :value="task.target_condition"/>
              </div>
            </template>

            <template v-else-if="task.task_target=='ContinuousDayIncrease'">
              <div class="flex align-center">
                <span class="font-bold fc-432af5">
                  <money-number
                      :value="task.user_task.ut_continuous_day || 0"
                      v-if="task.user_task"
                  />
                  <span v-else>{{ 0 }}</span>
                </span>
                <span class="margin-lr-xs font-bold">/</span>
                <money-number :value="task.continuous_day"/>
              </div>
            </template>
          </div>
          <div class="padding-left-xs fc-888 fs-12">{{task.describe}}</div>
        </div>
      </template>
      <template #right-icon>
        <van-icon class="margin-left-sm" name="arrow"/>
      </template>
    </van-cell>

    <van-popup
        class="vw-90 box-shadow border-radius"
        v-model="showTaskDetail"
        v-if="showTaskDetail"
        ref="taskCard"
    >
      <div class="padding flex flex-direction position-re">
        <van-icon
            size="0.52rem"
            name="cross"
            color="#432af5"
            class="position-ab close-icon"
            @click="closeModel"
        />

        <div class="flex align-center margin-bottom justify-center">
<!--          <img :src="task.icon" class="border-radius-50 size-25 margin-right-xs">-->
          <div class="fs-16 font-bold">{{task.title}}</div>
        </div>

        <div class="flex flex-direction padding-bottom-xl" style="max-height:56vh;overflow:auto">
          <div class="margin-bottom fc-888 text-wrap render-html" v-html="task.content || $t('NO_TASK_DESCRIPTION','暂无任务描述')"/>

          <van-notice-bar
              class="margin-bottom padding-tb-xs padding-lr-sm"
              :wrapable="true"
              v-if="task.check_withdraw"
          >
            {{$t('WILL_DEDUCE_WITHDRAW_AMOUNT','计算累计金额时，会扣除提现金额')}}
          </van-notice-bar>

          <!-- 次数进度 Accomplish && target_condition > 1 -->
          <template v-if="task.task_target=='Accomplish' && task.target_condition>1">
            <div class="margin-bottom-xs flex align-center justify-between fs-10 padding-lr-xs">
              <span v-if="task.user_task">{{$t('DONE_N_TIMES',[task.user_task.target_condition.toString()],'已完成N')}}</span>
              <span v-else>{{$t('DONE_N_TIMES',['0'],'已完成N')}}</span>
              <span>{{$t('N_TIMES',[task.target_condition.toString()],'N')}}</span>
            </div>
            <div class="margin-bottom padding-lr-xs">
              <van-progress
                  color="#432af5"
                  stroke-width="8"
                  :percentage="((task.user_task?task.user_task.target_condition:0)/task.target_condition)*100"
                  :show-pivot="false"
              />
            </div>
          </template>

          <!-- 天数进度 ContinuousDay   ContinuousDayIncrease  && target_condition(每天的进度条) > 1   continuous_day(天数的进度条) > 1 -->
          <template v-if="['ContinuousDay','ContinuousDayIncrease'].includes(task.task_target)">
            <!-- 每天的进度条 -->
            <template v-if="task.target_condition>1">
              <div class="margin-bottom-xs flex align-center justify-between fs-10 padding-lr-xs">
               <span v-if="task.user_task">{{$t('TODAY_DONE_N_TIMES',[(task.user_task.target_condition>0?task.user_task.target_condition:0).toString()],'今日已完成N')}}</span>
                <span v-else>{{$t('TODAY_DONE_N_TIMES',['0'],'今日已完成N')}}</span>
                <span>{{$t('N_TIMES',[task.target_condition.toString()],'N')}}</span>
              </div>
              <div class="margin-bottom padding-lr-xs">
                <van-progress
                    color="#432af5"
                    stroke-width="8"
                    :percentage="((task.user_task?task.user_task.target_condition:0)/task.target_condition)*100"
                    :show-pivot="false"
                />
              </div>
            </template>

            <!-- 天数的进度条 -->
            <template  v-if="task.continuous_day>1">
              <div class="margin-bottom-xs flex align-center justify-between fs-10 padding-lr-xs">
                <span v-if="task.user_task">{{$t('DONE_N_DAYS',[task.user_task.ut_continuous_day.toString()],'已完成N天')}}</span>
                <span v-else>{{$t('DONE_N_DAYS',['0'],'已完成N天')}}</span>
                <span>{{$t('N_DAYS',[task.continuous_day.toString()],'N天')}}</span>
              </div>
              <div class="margin-bottom padding-lr-xs">
                <van-progress
                    color="#432af5"
                    stroke-width="8"
                    :percentage="((task.user_task?task.user_task.ut_continuous_day:0)/task.continuous_day)*100"
                    :show-pivot="false"
                />
              </div>
            </template>
          </template>

          <div class="flex align-center fs-12 fc-888">
            <div class="margin-right-xs opacity-80">
              {{$t('START_TIME','开始时间')}}:
            </div>
            <div class="">
              {{$localTime(task.start_time)}}
            </div>
          </div>
          <div class="flex align-center fs-12 fc-ff3636 margin-top-xs" v-if="task.end_time">
            <div class="margin-right-xs opacity-80">
              {{$t('END_TIME','结束时间')}}:
            </div>
            <div class="">
              {{$localTime(task.end_time)}}
            </div>
          </div>
        </div>
        <div class="position-re">
          <div class="overflow-overlay"></div>
        </div>

        <template>
          <van-button
              class="border-radius-xs font-bold margin-top-sm "
              disabled
              color="#432af5"
              v-if="task.hook=='Sign' && todaySignIn"
          >
            {{$t('TODAY_CHECKINED','今日已签到')}}
          </van-button>
          <van-button
              class="border-radius-xs font-bold margin-top-sm breath-btn"
              color="#432af5"
              @click="toTask"
              v-else
          >
            {{task.btn_name || task.hook}}
          </van-button>
        </template>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {Button,Cell,Icon,Popup,Progress,NoticeBar} from "vant"
import {Base} from "@/mixins";
import {Toast} from "mand-mobile";
import MoneyNumber from "@/components/MoneyNumber";
export default {
  components: {
    MoneyNumber,
    [Button.name]:Button,
    [Cell.name]:Cell,
    [Icon.name]:Icon,
    [Popup.name]:Popup,
    [Progress.name]:Progress,
    [NoticeBar.name]:NoticeBar
  },
  props: {
    task: {
      type: Object,
      default: Object
    },
    todaySignIn: {
      type: Boolean,
      default: false
    }
  },
  data: ()=> {
    return {
      showTaskDetail: false
    }
  },
  mixins: [Base],
  methods: {
    seeTaskDetail() {
      this.$webEvent('打开任务详情','任务页面')
      this.showTaskDetail=true
    },
    closeModel() {
      this.$webEvent('关闭任务详情','任务页面')
      this.$closeModel(this.$refs.taskCard.$el)
      setTimeout(()=>{
        this.showTaskDetail = false
      },300)
    },
    toTask() {
      this.$webEvent(`点击去完成任务-${this.task.hook}`,'任务页面')
      if (this.task.hook=='Sign' && !this.todaySignIn) {
        this.$emit('checkIn')
      } else if (this.task.hook=='Invite') {
        this.$bus.emit('share')
      } else if (this.task.hook=='Recharge') {
        this.$toRouter({ name: 'Deposit' })
        this.closeModel()
      } else if (this.task.hook=='Earnings') {
        this.$toRouter({ name: 'HomeMoney' })
        this.closeModel()
      } else {
        Toast.info(this.$t('NOT_OPEN','暂未开放'))
      }
    }
  }
}
</script>

<style lang="scss">
.task-card {
  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .overflow-overlay {
    position: absolute;
    height: 0.7rem;
    top: 0;
    left: 0;
    right: 0;
    transform: translate(0, -95%);
    background: linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,1));
  }
}
</style>