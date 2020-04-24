import $http from '@/axiosConfig/axios.init'

export default {
	//查询数据字典下拉列表
    getDictTypeList: (params, config) => $http.post("/dic/getPageList", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取项目列表
    getProjectList: (params, config) => $http.post("/project/getPageList", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取所有项目列表(不受projectCode过滤)
    getAllPageList: (params, config) => $http.post("/project/getAllPageList", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增项目
    addProject: (params, config) => $http.post("/project/addOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //修改项目信息
    editProject: (params, config) => $http.post("/project/updateOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询用户权限table列表
    getPermissionList: (params, config) => $http.post("/userRights/getUserRightsByPage", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询用户权限详情(编辑之前)
    getUserPermissionInfo: (params, config) => $http.get("/userRights/findUserRightsById", params, config).then((rsp) => {
		return rsp.data
    }),
    //权限管理下添加用户权限
    addUserPermission: (params, config) => $http.post("/userRights/addUserRights", params, config).then((rsp) => {
		return rsp.data
    }),
    //权限管理下修改用户权限
    editUserPermission: (params, config) => $http.post("/userRights/updateUserRights", params, config).then((rsp) => {
		return rsp.data
    }),
    //权限管理下 删除用户权限
    deleteUserRights: (params, config) => $http.delete("/userRights/delUserRights", params, config).then((rsp) => {
		return rsp.data
    }),
    //通过或驳回用户权限(2通过，0驳回)
    approveUserRights: (params, config) => $http.get("/userRights/approveUserRights", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询用户权限管理城市列表
    getAllManageCityList: (params, config) => $http.get("/userManageCity/getAllManageCityList", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询用户权限 下 经营城市下拉列表
    getBusinessCity: (params, config) => $http.get("/userManageCity/getAllBusinessCityList", params, config).then((rsp) => {
		return rsp.data
    }),
    
    
    //查询用户权限 下片区下拉列表(根据经营城市code查询)
    getAllPartAreaList: (params, config) => $http.get("/userManageCity/getAllPartAreaList", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询用户权限店铺列表
    getAllStoreList: (params, config) => $http.post("/userStore/getAllStoreList", params, config).then((rsp) => {
		return rsp.data
    }),
    
    //查询所在地区列表
    getAllRegionList: (params, config) => $http.get("/userRegion/getAllRegionList", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取权限下拉列表
    getUserRightsTypeList: (params, config) => $http.post("/userRightsType/getUserRightsTypeList", params, config).then((rsp) => {
		return rsp.data
    }),
  
  
    //用户权限品牌列表
    getAllBrandList: (params, config) => $http.get("/userBrand/getAllBrandList", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询数据权限table列表
    getDataSourceList: (params, config) => $http.post("/projectDatasource/getList", params, config).then((rsp) => {
		return rsp.data
    }),
    //测试数据源连接
    testConnection: (params, config) => $http.post("/projectDatasource/testConnection", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增数据源
    addDataSource: (params, config) => $http.post("/projectDatasource/addOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //修改数据源
    updateDataSource: (params, config) => $http.post("projectDatasource/updateOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //判断数据源名称是否已经被使用
    checkDbName: (params, config) => $http.get("/projectDatasource/checkDbName", params, config).then((rsp) => {
		return rsp.data
    }),
    //编辑， 根据id查询数据源详情
    getDataSourceInfo: (params, config) => $http.get("/projectDatasource/getOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除数据源
    deleteDataSource: (params, config) => $http.get("/projectDatasource/deleteOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询过滤器管理table列表（带分页）
    getFilterTableList: (params, config) => $http.post("/filter/getPageList", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询过滤器管理列表(不带分页)
    getFilterList: (params, config) => $http.post("/filter/getList", params, config).then((rsp) => {
		return rsp.data
    }),
    //根据id查询过滤详细信息
    getFilterInfo: (params, config) => $http.get("/filter/getOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增筛选器
    addFilter: (params, config) => $http.post("/filter/addOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //编辑筛选器
    updateFilter: (params, config) => $http.post("/filter/updateOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除过滤器
    deleteFilter: (params, config) => $http.get("/filter/deleteOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询组件管理下 指标table表格数据列表（带分页）
    getKpiDimensionList: (params, config) => $http.post("/kpiDimension/getPageList", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询指标维度列表(不带分页)
    getKpiDimensionAllList: (params, config) => $http.post("/kpiDimension/getList", params, config).then((rsp) => {
		return rsp.data
    }),
    //根据id查询指标维度详细信息
    getKpiDimensionInfo: (params, config) => $http.get("/kpiDimension/getOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增指标维度
    addKpiDimension: (params, config) => $http.post("/kpiDimension/addOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //编辑指标维度
    updateKpiDimension: (params, config) => $http.post("/kpiDimension/updateOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除指标维度
    deleteKpiDimension: (params, config) => $http.get("kpiDimension/deleteOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询公共组件table表格数据列表
    getPubComponentList: (params, config) => $http.post("/publicComponent/getList", params, config).then((rsp) => {
		return rsp.data
    }),
    //编辑公共组件
    updatePubComponent: (params, config) => $http.post("/publicComponent/updateOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询模块管理table表格数据列表
    getModuleList: (params, config) => $http.post("/modules/getPageList", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除模块管理row
    deleteModule: (params, config) => $http.get("/modules/deleteOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增模块(保存)
    addUnionModules: (params, config) => $http.post("/modules/addUnionModules", params, config).then((rsp) => {
		return rsp.data
    }),
    //修改模块(保存)
    updateUnionModules: (params, config) => $http.post("/modules/updateUnionModules", params, config).then((rsp) => {
		return rsp.data
    }),
    //模块管理查询模块详情
    getOneUnionModules: (params, config) => $http.get("/modules/getOneUnionModules", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询每个筛选器下的选项列表（不包含自定义筛选器下的自定义时间项）
    getFilterSubOptions: (params, config) => $http.post("/exeSql/querySql", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询每个筛选器下的选项列表（包含自定义筛选器下的自定义时间项）
    getFilterSubItems: (params, config) => $http.post("/filter/getFilterValues", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询公共模块table表格数据列表
    getPubModuleList: (params, config) => $http.post("/publicModules/getList", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除模块管理row
    deletePubModule: (params, config) => $http.get("/publicModules/deleteOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增公共模块
    addPubModule: (params, config) => $http.post("/publicModules/addOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //编辑公共模块
    updatePubModule: (params, config) => $http.post("/publicModules/updateOne", params, config).then((rsp) => {
		return rsp.data
    }),
     //查询卡片管理table表格数据列表
    getCardTableList: (params, config) => $http.post("/cards/getPageList", params, config).then((rsp) => {
		return rsp.data
    }),
    //添加卡片 查询模块下拉列表
    getUnionModuleList: (params, config) => $http.post("/modules/getUnionRsDataList", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除卡片管理row
    deleteOneCard: (params, config) => $http.get("/cards/deleteOneCard", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增卡片(保存)
    addUnionCardModules: (params, config) => $http.post("/cards/addUnionCardModules", params, config).then((rsp) => {
		return rsp.data
    }),
    //编辑卡片(保存)
    updateUnionCardModules: (params, config) => $http.post("/cards/updateUnionCardModules", params, config).then((rsp) => {
		return rsp.data
    }),
   //根据id查询卡片详细信息
    getOneUnionCardInfo: (params, config) => $http.get("/cards/getOneUnionCard", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询数据字典tree结构
    getDictTreeList: (params, config) => $http.post("/dic/getTreeList?pageNo=1&pageSize=5000", params, config).then((rsp) => {
		return rsp.data
    }),
    //新增数据字典
    addDictTreeData: (params, config) => $http.post("/dic/addOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除某条数据字典信息
    deleteDictTreeData: (params, config) => $http.get("/dic/deleteOne", params, config).then((rsp) => {
		return rsp.data
    }),
     //修改数据字典数据
    updateDictTreeData: (params, config) => $http.post("/dic/updateOne", params, config).then((rsp) => {
		return rsp.data
    }),
    //校验数据字典key是否被占用
    validDictTreeData: (params, config) => $http.get("/dic/getDicByKey", params, config).then((rsp) => {
		return rsp.data
    }),
    
}    