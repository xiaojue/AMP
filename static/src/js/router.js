import Index from './component/main/index.vue';
import Main from './component/main/main.vue';

import ProjectList from './component/project/projectList.vue';
import ProjectDetail from './component/project/projectDetail.vue';
import ProjectEdit from './component/project/projectEdit.vue';

import ApiList from './component/api/apiList.vue';
import ApiDetail from './component/api/apiDetail.vue';
import ApiEdit from './component/api/apiEdit.vue';

import PostMan from './component/postman/main.vue';

import Introduction from './component/extra/introduction.vue';
import Feedback from './component/extra/feedback.vue';

export default (router) => {
	router.map({
		'/': {
			component: Index
		},
		'/main': {
			component: Main,
			subRoutes: {
				'/project/list/:type': {
					name: 'projectList',
					component: ProjectList
				},
				'/project/detail/:id': {
					name: 'projectDetail',
					component: ProjectDetail
				},
				'/project/edit/:id': {
					name: 'projectEdit',
					component: ProjectEdit
				},
				'/api/list/:type': {
					name: 'apiList',
					component: ApiList
				},
				'/api/detail/:id': {
					name: 'apiDetail',
					component: ApiDetail
				},
				'/api/edit/:id': {
					name: 'apiEdit',
					component: ApiEdit
				},
				'/postman': {
					name: 'postMan',
					component: PostMan
				},
				'/introduction': {
					name: 'introduction',
					component: Introduction
				},
				'/feedback': {
					name: 'feedback',
					component: Feedback
				}
			}
		}
	});

	router.redirect({
		'*': '/'
	});
};
