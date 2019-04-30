
//business文件下的
import Salary from '../pages/business/salary/index';
//backlog文件下
import Advisory from '../pages/backlog/advisory/index';
import BaoZhuang from '../pages/backlog/baozhuang/index';
import Search from '../pages/backlog/baozhuang/search';
import SiteSurvey from '../pages/backlog/siteSurvey/index';
import EngineerDesign from '../pages/backlog/engineerDesign/index';
// import Info from '../pages/backlog/engineerDesign/info';
import Add_table from '../pages/backlog/engineerDesign/add_table';
import Add_manage from '../pages/backlog/engineerDesign/add_manage';
import InstallInfo from '../pages/backlog/siteSurvey/info';
import Budgeting from '../pages/backlog/budgeting/index';
import DesignInfo from '../pages/backlog/budgeting/designInfo';
import Construction from '../pages/backlog/construction/index';
import ChargeView from '../pages/backlog/chargeView/index';
import ConstructionManage from '../pages/backlog/constructionManage/index';
import ProcessInfo from '../pages/backlog/constructionManage/info';
import AddMeter from '../pages/backlog/constructionManage/add';
import Completion from '../pages/backlog/completionArchiving/index';
import ConnectedWater from '../pages/backlog/connectedWater/index';
import WaterMeterReceive from '../pages/backlog/waterMeterReceive/index';
import WaterMeterDetail from '../pages/backlog/waterMeterReceive/detail';

import BaozhuangCheck from '../pages/backlog/baozhuang/check';


import myInfo from '../pages/my/info';
import myUpdatePwd from '../pages/my/password';
import myNotice from '../pages/my/notice';
import myNoticeDetail from '../pages/my/noticeDetail';
import myFinish from '../pages/my/finish';
import myFinishDetail from '../pages/my/finishDetail';

//领导 我的

import myLeaderInfo from '../pages/leader/my/info';
import myLeaderUpdatePwd from '../pages/leader/my/password';
import myLeaderNotice from '../pages/leader/my/notice';
import myLeaderNoticeDetail from '../pages/leader/my/noticeDetail';
import myLeaderFinish from '../pages/leader/my/finish';
import myLeaderFinishDetail from '../pages/leader/my/finishDetail';
//业务
import busTranxList from '../pages/business/track/list';
import busPlanList from '../pages/business/track/planList';
import busInputPlan from '../pages/business/track/input';
import busTrackView from '../pages/business/track/trackView';//客户跟踪记录清单
import busPatrolPlan from '../pages/business/patrol/plans';//水表巡查计划
import busPatrolPlanList from '../pages/business/patrol/list';//水表巡查计划列表
import busPatrolPlanResult from '../pages/business/patrol/result';//水表巡查计划列表
import busInspectPlan from '../pages/business/inspect/plans';//检查计划
import busInspectCheck from '../pages/business/inspect/checklist';//检查清单
import busInspectDetail from '../pages/business/inspect/detail';//报装详情
import busInspectInput from '../pages/business/inspect/checkinfo';//录入检查结果
import busInspectResult from '../pages/business/inspect/result';//检查结论
import comTree from '../component/tree';//树节点选择
//leader--approval下
import DepartmentCredit from '../pages/leader/approval/creditCheck/departmentCheck';
import LeaderCheckPipeLine from '../pages/leader/approval/pipeLineReview/leaderCheck';
import BuildCheckPipeLine from '../pages/leader/approval/pipeLineReview/buildCheck';
import DesignFileCheck from '../pages/leader/approval/designFileCheck/leaderCheck';

import PressureTestCheck from '../pages/leader/approval/pressureTestCheck/leaderCheck';
import ProcedureWaitCheck from '../pages/leader/approval/procedureWaitCheck/leaderaCheck';
import RevokeCheck from '../pages/leader/approval/revokeCheck/check';
import PauseCheck from '../pages/leader/approval/pause/check';


import ExceptionLeaderCheck from '../pages/leader/approval/exception/leaderCheck';
import ProjectCheck from '../pages/leader/approval/projectCheck/check';//工程验收---管网验收审核
import ProjectCheckDetail from '../pages/leader/approval/projectCheck/detail';//工程验收---管网验收审核--查看
import comTreeLeader from '../component/tree';//树节点选择----领导角色

const businessRouter ={
    // 待办----咨询
    advisory: {
        screen: Advisory,
    },
    // 待办----报装受理
    baozhuang: {
        screen: BaoZhuang,
    },
     // 待办----报装受理审核
     BaozhuangCheck: {
        screen: BaozhuangCheck,
    },
    // 待办----报装受理----智能检索结果
    searchResult: {
        screen: Search,
    },
    //待办----工程设计----基础信息
    // infoResult: {
    //     screen: Info,
    // },
    //待办----工程设计----添加水表
    add_tableResult: {
        screen: Add_table,
    },
    //待办----工程设计----添加管道
    add_manageResult: {
        screen: Add_manage,
    },
    //报装基础信息
    InstallInfo: {
        screen: InstallInfo,
    },
    // 待办---现场踏勘
    siteSurvey: {
        screen: SiteSurvey,
    },
    // 待办---工程设计
    engineerDesign: {
        screen: EngineerDesign,
    },
    // 待办---工程设计
    designInfo: {
        screen: DesignInfo,
    },
    // 待办---预算编制
    budgeting: {
        screen: Budgeting,
    },
    // 待办---施工合同签订
    construction: {
        screen: Construction,
    },
    // 待办---缴纳工程款
    chargeView: {
        screen: ChargeView,
    },
    // 待办---工程施工
    constructionManage: {
        screen: ConstructionManage,
    },
    // 待办---工程施工---施工整体进度总览
    processInfo: {
        screen: ProcessInfo,
    },
    // 待办---工程施工---添加水表
    addMeter: {
        screen: AddMeter,
    },
    // 待办---水表接收
    WaterMeterReceive: {
        screen: WaterMeterReceive,
    },
    // 待办---水表接收详情
    WaterMeterDetail: {
        screen: WaterMeterDetail,
    },
    // 待办---竣工归档
    completion: {
        screen: Completion,
    },
    //我的 -- 个人信息查看
    myInfo:{
        screen:myInfo,
        navigationOptions:{
            title:'个人信息查看',
        }
    },
    myUpdatePwd:{
        screen:myUpdatePwd,
        navigationOptions:{
            title:'密码修改',
        }
    },

    myNotice:{
        screen:myNotice,
        navigationOptions:{
            title:'我的通知消息',
        }
    },
    myNoticeDetail:{
        screen:myNoticeDetail,
        navigationOptions:{
            title:'通知详情',
        }
    },
    myFinish:{
        screen:myFinish,
        navigationOptions:{
            title:'我的已办事项',
        }
    },
    myFinishDetail:{
        screen:myFinishDetail,
        navigationOptions:{
            title:'已办事项详情',
        }
    },
      //business文件下的
    //新增新增薪信度
    newsalary: {
        screen: Salary,
        navigationOptions:{
            title:'新增薪信度',
        }
    },
    busTranxList:{
        screen:busTranxList,
        navigationOptions:{
            title:'客户跟踪计划',
        }
    },
    busPlanList:{
        screen:busPlanList,
        navigationOptions:{
            title:'客户跟踪计划详情',
        }
    },
    busInputPlan:{
        screen:busInputPlan,
        navigationOptions:{
            title:'跟踪记录录入',
        }
    }
    ,
    busTrackView:{
        screen:busTrackView,
        navigationOptions:{
            title:'客户跟踪记录清单',
        }
    },
    busPatrolPlan:{
        screen:busPatrolPlan,
        navigationOptions:{
            title:'水表巡检计划',
        }
    }
    ,
    busPatrolPlanList:{
        screen:busPatrolPlanList,
        navigationOptions:{
            title:'水表巡查计划列表',
        }
      
    },
    busPatrolPlanResult:{
        screen:busPatrolPlanResult,
        navigationOptions:{
            title:'水表巡检总体结论录入',
        }
      
    },
    busInspectPlan:{
        screen:busInspectPlan,
        navigationOptions:{
            title:'检查计划',
        }
       
    },
    busInspectCheck:{
        screen:busInspectCheck,
        navigationOptions:{
            title:'检查清单',
        }
    },
    busInspectDetail:{
        screen:busInspectDetail,
        navigationOptions:{
            title:'项目详细信息',
        }
    },
    busInspectInput:{
        screen:busInspectInput,
        navigationOptions:{
            title:'跟踪记录录入',
        }
    },
    busInspectResult:{
        screen:busInspectResult
    },
    comTree:{
        screen:comTree
    },

    // 待办---通水管理
    connectedWater: {
        screen: ConnectedWater,
    },
 
};

 const leaderRouter ={
      //审批
    //一类资信度审核
    // 部门领导审核
    department_credit: {
        screen: DepartmentCredit,
    },
    //管道复核
    //领导审核
    leaderCheck_pipeLine: {
        screen: LeaderCheckPipeLine,
    },
    //建设指挥部审核
    buildCheck_pipeLine: {
        screen: BuildCheckPipeLine,
    },
       //测压申请-----领导审核
    PressureTestCheck: {
        screen: PressureTestCheck,
    },
    //设计文件确认---领导审核
    //设计文件修改---领导审核
    //设计文件修改---设计部门领导审核
    DesignFileCheck: {
        screen: DesignFileCheck,
    },
     //手续代办--领导审核
     ProcedureWaitCheck: {
        screen: ProcedureWaitCheck,
    },
    //客户撤销---负责人审核
    RevokeCheck: {
        screen: RevokeCheck,
    },
    //客户暂停---部门领导审核
    PauseCheck: {
        screen: PauseCheck,
    },
    comTreeLeader:{
        screen:comTreeLeader
    },
    //异常流程---部门领导审核
    ExceptionLeaderCheck: {
        screen: ExceptionLeaderCheck,
    },
    //工程验收---管网验收审核
    ProjectCheck: {
        screen: ProjectCheck,
    },
    //工程验收---管网验收审核--查看
    ProjectCheckDetail: {
        screen: ProjectCheckDetail,
    },
    
        //我的 -- 个人信息查看
        myLeaderInfo:{
            screen:myLeaderInfo,
            navigationOptions:{
                title:'个人信息查看',
            }
        },
        myLeaderUpdatePwd:{
            screen:myLeaderUpdatePwd,
            navigationOptions:{
                title:'密码修改',
            }
        },
    
        myLeaderNotice:{
            screen:myLeaderNotice,
            navigationOptions:{
                title:'我的通知消息',
            }
        },
        myLeaderNoticeDetail:{
            screen:myLeaderNoticeDetail,
            navigationOptions:{
                title:'通知详情',
            }
        },
        myLeaderFinish:{
            screen:myLeaderFinish,
            navigationOptions:{
                title:'我的已办事项',
            }
        },
        myLeaderFinishDetail:{
            screen:myLeaderFinishDetail,
            navigationOptions:{
                title:'已办事项详情',
            }
        },

}
var params = {businessRouter:businessRouter,leaderRouter:leaderRouter}
export default params