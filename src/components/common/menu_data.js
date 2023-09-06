export default {
  get_menu_data: () => {
    return [
      {
        path: '/dynamicInfo',
        name: 'dynamicInfo',
        label: '动态资讯',
        icon: require('../../assets/img/dynamicInfo.png')
      },
      {
        path: '/citrusEncyclopedia',
        name: 'citrusEncyclopedia',
        label: '柑橘百科',
        icon: require('../../assets/img/citrusEncyclopedia.png'),
      },
      {
        path: '/citrusEfficacy',
        name: 'citrusEfficacy',
        label: '柑橘功效',
        icon: require('../../assets/img/citrusEfficacy.png')
      },
      {
        path: '/diseaseControl',
        name: 'diseaseControl',
        label: '疾病防治',
        icon: require('../../assets/img/diseaseControl.png'),
        children: [
          {
            path: '/diseasePreview',
            name: 'diseasePreview',
            label: '疾病预览',
            icon: require('../../assets/img/diseasePreview.png')
          },
          {
            path: '/graphicDiagnosis',
            name: 'graphicDiagnosis',
            label: '图文诊断',
            icon: require('../../assets/img/graphicDiagnosis.png')
          },
          {
            path: '/visualDiagnosis',
            name: 'visualDiagnosis',
            label: '目检诊断',
            icon: require('../../assets/img/visualDiagnosis.png')
          },
          {
            path: '/intelligentDiagnosis',
            name: 'intelligentDiagnosis',
            label: '智能诊断',
            icon: require('../../assets/img/intelligentDiagnosis.png')
          },
        ]
      },
      {
        path: '/scientificMedication',
        name: 'scientificMedication',
        label: '用药指导',
        icon: require('../../assets/img/scientificMedication.png')
      },
      {
        path: '/plantingTechnique',
        name: 'plantingTechnique',
        label: '农技学堂',
        icon: require('../../assets/img/plantingTechnique.png')
      },
      {
        path:'ZHKU',
        name:'ZHKU',
        label:'柑橘基地(仲恺)',
        icon:require('../../assets/img/deviceManagment.png'),
        children:[
          {
            path: '/deviceManagment',
            name: 'deviceManagment',
            label: '视频监控',
            icon: require('../../assets/img/deviceManagment.png')
          },{
            path: '/environmentalPrediction',
            name: 'environmentalPrediction',
            label: '环境预测',
            icon: require('../../assets/img/environmentalPrediction.png'),
          },{
            path:'/environmentData',
            name:'environmentData',
            label:'图表数据',
            icon: require('../../assets/img/environmentalPrediction.png'),
          }
        ]
      }
    ]
  }
}
