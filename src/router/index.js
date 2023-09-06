import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

// 导入动态资讯
import DynamicInfo from '../views/dynamicInfo.vue'
import DynamicDetails from '../views/dynamicDetails.vue'
// 导入柑橘百科
import CitrusEncyclopedia from '../views/citrusEncyclopedia.vue'
// 导入设备管理
import DeviceManagment from '../views/ZHKU/deviceManagment.vue'
// 导入环境预测
import EnvironmentalPrediction from '../views/ZHKU/environmentalPrediction.vue'
import EnvironmentData from '../views/ZHKU/environmentData.vue'
// 带入科学用药
import ScientificMedication from '../views/scientificMedication.vue'

// 导入疾病防治
import DiseasePreview from '../views/diseaseControl/diseasePreview.vue'
import GraphicDiagnosis from '../views/diseaseControl/graphicDiagnosis.vue'
import VisualDiagnosis from '../views/diseaseControl/visualDiagnosis.vue'
import IntelligentDiagnosis from '../views/diseaseControl/intelligentDiagnosis.vue'
import DiseaseDetails from '../views/diseaseControl/diseaseDetails.vue'

// 导入柑橘功效
import CitrusEfficacy from '../views/citrusEfficacy.vue'

// 导入种植技术
import PlantingTechnique from '../views/plantingTechnique/plantingTechnique.vue'
import TechnologyDetails from '../views/plantingTechnique/technologyDetails.vue'

/***
 * 在升级了Vue-Router版本到到3.1.0及以上之后，页面在跳转路由控制台会报Uncaught (in promise)的问题，
 * 在3.1.0版本里面新增功能：push和replace方法会返回一个promise, 你可能在控制台看到未捕获的异常。
 * 解决办法
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    redirect: '/dynamicInfo',
    component: Main,
    children: [
      {
        path: '/dynamicInfo',
        name: 'dynamicInfo',
        component: DynamicInfo
      },
      {
        path: '/dynamicDetails',
        name: 'dynamicDetails',
        component: DynamicDetails
      },
      {
        path: '/citrusEncyclopedia',
        name: 'citrusEncyclopedia',
        component: CitrusEncyclopedia
      },
      {
        path: '/deviceManagment',
        name: 'deviceManagment',
        component: DeviceManagment
      },
      {
        path: '/environmentalPrediction',
        name: 'environmentalPrediction',
        component: EnvironmentalPrediction
      },
      {
        path: '/scientificMedication',
        name: 'scientificMedication',
        component: ScientificMedication
      },
      {
        path: '/diseasePreview',
        name: 'diseasePreview',
        component: DiseasePreview,
        meta: {
          keepAlive:true
        }
      },
      {
        path: '/graphicDiagnosis',
        name: 'graphicDiagnosis',
        component: GraphicDiagnosis
      },
      {
        path: '/visualDiagnosis',
        name: 'visualDiagnosis',
        component: VisualDiagnosis
      },
      {
        path: '/intelligentDiagnosis',
        name: 'intelligentDiagnosis',
        component: IntelligentDiagnosis
      },
      {
        path: '/diseaseDetails',
        name: 'diseaseDetails',
        component: DiseaseDetails
      },
      {
        path: '/citrusEfficacy',
        name: 'citrusEfficacy',
        component: CitrusEfficacy
      },
      {
        path: '/plantingTechnique',
        name: 'plantingTechnique',
        component: PlantingTechnique
      },
      {
        path: '/technologyDetails',
        name: 'technologyDetails',
        component: TechnologyDetails
      },
      {
        path: '/environmentData',
        name: 'environmentData',
        component: EnvironmentData
      }
    ]
  },
]

const router = new VueRouter({
  routes
})




// 设置路由守卫,检查token是否存在

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return next('/login')
    } else {
      next()
    }
  }
})

export default router
