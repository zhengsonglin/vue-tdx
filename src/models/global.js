import storage from 'good-storage';

export default {
	namespace: 'global',

	state: {
    userLoginInfo: storage.get('userLoginInfo', {}),
    banners:[ 'img/s-1.jpg', 'img/s-2.jpg', 'img/s-3.jpg', 'img/s-4.jpg' ],
		advertisingList: [
			{
				id: '1',
				text: '全国商品免费包邮领取'
			},
			{
				id: '2',
				text: '【紧急通知】禁止吸粉'
			},
			{
				id: '3',
				text: '淘大熊商家操作教程'
			},
			{
				id: '4',
				text: '平台内测，实名认证'
			},
			{
				id: '5',
				text: '实名认证联系客服审核'
			},
			{
				id: '6',
				text: '【必读】放单节奏问题'
			}
		]
	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
		}
	},

	effects: {
		*fetch({ payload }, { call, put }) {
			// eslint-disable-line
			yield put({ type: 'save' });
		}
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
		setUserLoginInfo(state, action) {
			console.log('global', action);
			storage.set('userLoginInfo', ...action.payload);
			return { ...state, ...action.payload };
		}
	}
};
